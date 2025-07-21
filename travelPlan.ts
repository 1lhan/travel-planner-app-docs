import express from 'express';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

router.post('/travel-plan', async (req, res) => {
  try {
    const {
      userId, // Giriş yapan kullanıcının ID'si
      title,
      travelSteps,     // JSON
      interests,       // categoryId[] (string[])
      minBudget,
      maxBudget,
      selectedCampaignIds // Kullanıcının bu planla eşleştirdiği kampanyaların ID'leri (string[])
    } = req.body;

    // 1️⃣ TravelPlan kaydını oluştur
    const newTravelPlan = await prisma.travelPlan.create({
      data: {
        userId,
        title,
        travelSteps,
        interests: {
          connect: interests.map((id: string) => ({ id })) // Category[] bağlantısı
        },
        minBudget,
        maxBudget
      }
    });

    // 2️⃣ Kullanıcı objesi güncellenir (ilişki otomatik oluşur çünkü User → TravelPlans ilişkisi var)
    // Bu adım prisma'da otomatik işler, elle güncellemene gerek yok ama açıklama için:
    // await prisma.user.update({
    //   where: { id: userId },
    //   data: {
    //     travelPlans: { connect: { id: newTravelPlan.id } }
    //   }
    // });

    // 3️⃣ Kullanıcı kampanyalara katılmışsa CampaignParticipation kayıtlarını oluştur
    const campaignParticipationPromises = selectedCampaignIds.map(async (campaignId: string) => {
      return prisma.campaignParticipation.create({
        data: {
          campaignId,
          userId,
          status: 'Approved', // veya başlangıçta Pending
          participatedAt: new Date()
        }
      });
    });

    const participations = await Promise.all(campaignParticipationPromises);

    // 4️⃣ Campaign objeleri TravelPlan ile eşleştirilir (appliedCampaigns ilişkisi)
    await prisma.travelPlan.update({
      where: { id: newTravelPlan.id },
      data: {
        appliedCampaigns: {
          connect: selectedCampaignIds.map((id: string) => ({ id }))
        }
      }
    });

    // 5️⃣ (Opsiyonel) Campaign joinCount alanını artır
    await Promise.all(
      selectedCampaignIds.map((campaignId: string) =>
        prisma.campaign.update({
          where: { id: campaignId },
          data: { joinCount: { increment: 1 } }
        })
      )
    );

    // 6️⃣ (Opsiyonel) Kullanıcının toplam cashback'i varsa güncellenebilir ama checkedIn değilse henüz kazanç netleşmez
    // Cashback işlemi ayrı bir endpoint ya da check-in sürecinde yapılır

    return res.status(201).json({
      message: 'Seyahat planı başarıyla oluşturuldu.',
      travelPlan: newTravelPlan,
      participations
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Bir hata oluştu.' });
  }
});

export default router;
