import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  // vidCat : 1 --> Films; 2 --> Corporate; 3 --> Musique;
  const videos = await prisma.video.createMany({
    data: [
      {
        dateOfCreation: new Date("1994-08-01"),
        title: "Holding Hands",
        videoName: "hands_holding.mp4",
        placeholder_hq: "hands_holding.png",
        vid_CategoryId: 1,
      },
      {
        dateOfCreation: new Date("1994-08-01"),
        title: "Girl Portrait",
        videoName: "girl_portrait.mp4",
        placeholder_hq: "girl_portrait.png",
        vid_CategoryId: 2,
      },

      {
        dateOfCreation: new Date("1994-08-01"),
        title: "Hero",
        videoName: "heroVideo_placeholder.mp4",
        placeholder_hq: "heroVideo_placeholder.png",
        vid_CategoryId: 3,
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
