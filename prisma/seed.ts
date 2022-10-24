import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const videos = await prisma.video.createMany({
    data: [
      {
        dateOfCreation: new Date(),
        title: "Holding Hands",
        videoName: "hands_holding.mp4",
        placeholder: "hands_holding.png",
        category: "Films",
      },
      {
        dateOfCreation: new Date(),
        title: "Holding Hands",
        videoName: "hands_holding.mp4",
        placeholder: "hands_holding.png",
        category: "Films",
      },
      {
        dateOfCreation: new Date(),
        title: "Holding Hands",
        videoName: "hands_holding.mp4",
        placeholder: "hands_holding.png",
        category: "Films",
      },
      {
        dateOfCreation: new Date(),
        title: "Holding Hands",
        videoName: "hands_holding.mp4",
        placeholder: "hands_holding.png",
        category: "Films",
      },
      {
        dateOfCreation: new Date("1994-08-01"),
        title: "Girl Portrait",
        videoName: "girl_portrait.mp4",
        placeholder: "girl_portrait.png",
        category: "Corporate",
      },
      {
        dateOfCreation: new Date("1994-08-01"),
        title: "Girl Portrait",
        videoName: "girl_portrait.mp4",
        placeholder: "girl_portrait.png",
        category: "Corporate",
      },
      {
        dateOfCreation: new Date("1994-08-01"),
        title: "Girl Portrait",
        videoName: "girl_portrait.mp4",
        placeholder: "girl_portrait.png",
        category: "Corporate",
      },
      {
        dateOfCreation: new Date("1994-08-01"),
        title: "Girl Portrait",
        videoName: "girl_portrait.mp4",
        placeholder: "girl_portrait.png",
        category: "Corporate",
      },
      {
        dateOfCreation: new Date("1994-08-01"),
        title: "Girl Portrait",
        videoName: "girl_portrait.mp4",
        placeholder: "girl_portrait.png",
        category: "Corporate",
      },
      {
        dateOfCreation: new Date("1994-08-01"),
        title: "Girl Portrait",
        videoName: "girl_portrait.mp4",
        placeholder: "girl_portrait.png",
        category: "Corporate",
      },
      {
        dateOfCreation: new Date("1994-08-01"),
        title: "Girl Portrait",
        videoName: "girl_portrait.mp4",
        placeholder: "girl_portrait.png",
        category: "Corporate",
      },
      {
        dateOfCreation: new Date("1994-08-01"),
        title: "Hero",
        videoName: "heroVideo_placeholder.mp4",
        placeholder: "heroVideo_placeholder.png",
        category: "Musique",
      },
      {
        dateOfCreation: new Date("1994-08-01"),
        title: "Hero",
        videoName: "heroVideo_placeholder.mp4",
        placeholder: "heroVideo_placeholder.png",
        category: "Musique",
      },
      {
        dateOfCreation: new Date("1994-08-01"),
        title: "Hero",
        videoName: "heroVideo_placeholder.mp4",
        placeholder: "heroVideo_placeholder.png",
        category: "Musique",
      },
      {
        dateOfCreation: new Date("1994-08-01"),
        title: "Hero",
        videoName: "heroVideo_placeholder.mp4",
        placeholder: "heroVideo_placeholder.png",
        category: "Musique",
      },
      {
        dateOfCreation: new Date("1994-08-01"),
        title: "Hero",
        videoName: "heroVideo_placeholder.mp4",
        placeholder: "heroVideo_placeholder.png",
        category: "Musique",
      },
      {
        dateOfCreation: new Date("1994-08-01"),
        title: "Hero",
        videoName: "heroVideo_placeholder.mp4",
        placeholder: "heroVideo_placeholder.png",
        category: "Musique",
      },
    ],
  });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
  });
