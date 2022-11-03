import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  // vidCat : 1 --> Films; 2 --> Corporate; 3 --> Musique;
  // const videos = await prisma.video.createMany({
  //   data: [
  //     {
  //       dateOfCreation: new Date("1994-08-01"),
  //       title: "Holding Hands",
  //       videoName: "heroVideo.mp4",
  //       placeholder_hq: "hands_holding.png",
  //       vid_CategoryId: "Films",
  //     },
  //     {
  //       dateOfCreation: new Date("1994-08-01"),
  //       title: "Girl Portrait",
  //       videoName: "heroVideo.mp4",
  //       placeholder_hq: "girl_portrait.png",
  //       vid_CategoryId: "Corporate",
  //     },
  //     {
  //       dateOfCreation: new Date("1994-08-01"),
  //       title: "Hero",
  //       videoName: "heroVideo.mp4",
  //       placeholder_hq: "heroVideo_placeholder.png",
  //       vid_CategoryId: "Musique",
  //     },
  //     {
  //       dateOfCreation: new Date("1994-08-01"),
  //       title: "Holding Hands",
  //       videoName: "heroVideo.mp4",
  //       placeholder_hq: "hands_holding.png",
  //       vid_CategoryId: "Films",
  //     },
  //     {
  //       dateOfCreation: new Date("1994-08-01"),
  //       title: "Girl Portrait",
  //       videoName: "heroVideo.mp4",
  //       placeholder_hq: "girl_portrait.png",
  //       vid_CategoryId: "Corporate",
  //     },
  //     {
  //       dateOfCreation: new Date("1994-08-01"),
  //       title: "Hero",
  //       videoName: "heroVideo.mp4",
  //       placeholder_hq: "heroVideo_placeholder.png",
  //       vid_CategoryId: "Musique",
  //     },
  //     {
  //       dateOfCreation: new Date("1994-08-01"),
  //       title: "Holding Hands",
  //       videoName: "heroVideo.mp4",
  //       placeholder_hq: "hands_holding.png",
  //       vid_CategoryId: "Films",
  //     },
  //     {
  //       dateOfCreation: new Date("1994-08-01"),
  //       title: "Girl Portrait",
  //       videoName: "heroVideo.mp4",
  //       placeholder_hq: "girl_portrait.png",
  //       vid_CategoryId: "Corporate",
  //     },
  //     {
  //       dateOfCreation: new Date("1994-08-01"),
  //       title: "Hero",
  //       videoName: "heroVideo.mp4",
  //       placeholder_hq: "heroVideo_placeholder.png",
  //       vid_CategoryId: "Musique",
  //     },
  //     {
  //       dateOfCreation: new Date("1994-08-01"),
  //       title: "Holding Hands",
  //       videoName: "heroVideo.mp4",
  //       placeholder_hq: "hands_holding.png",
  //       vid_CategoryId: "Films",
  //     },
  //     {
  //       dateOfCreation: new Date("1994-08-01"),
  //       title: "Girl Portrait",
  //       videoName: "heroVideo.mp4",
  //       placeholder_hq: "girl_portrait.png",
  //       vid_CategoryId: "Corporate",
  //     },
  //     {
  //       dateOfCreation: new Date("1994-08-01"),
  //       title: "Hero",
  //       videoName: "heroVideo.mp4",
  //       placeholder_hq: "heroVideo_placeholder.png",
  //       vid_CategoryId: "Musique",
  //     },
  //     {
  //       dateOfCreation: new Date("1994-08-01"),
  //       title: "Holding Hands",
  //       videoName: "heroVideo.mp4",
  //       placeholder_hq: "hands_holding.png",
  //       vid_CategoryId: "Films",
  //     },
  //     {
  //       dateOfCreation: new Date("1994-08-01"),
  //       title: "Girl Portrait",
  //       videoName: "heroVideo.mp4",
  //       placeholder_hq: "girl_portrait.png",
  //       vid_CategoryId: "Corporate",
  //     },
  //     {
  //       dateOfCreation: new Date("1994-08-01"),
  //       title: "Hero",
  //       videoName: "heroVideo.mp4",
  //       placeholder_hq: "heroVideo_placeholder.png",
  //       vid_CategoryId: "Musique",
  //     },
  //     {
  //       dateOfCreation: new Date("1994-08-01"),
  //       title: "Holding Hands",
  //       videoName: "heroVideo.mp4",
  //       placeholder_hq: "hands_holding.png",
  //       vid_CategoryId: "Films",
  //     },
  //     {
  //       dateOfCreation: new Date("1994-08-01"),
  //       title: "Girl Portrait",
  //       videoName: "heroVideo.mp4",
  //       placeholder_hq: "girl_portrait.png",
  //       vid_CategoryId: "Corporate",
  //     },
  //     {
  //       dateOfCreation: new Date("1994-08-01"),
  //       title: "Hero",
  //       videoName: "heroVideo.mp4",
  //       placeholder_hq: "heroVideo_placeholder.png",
  //       vid_CategoryId: "Musique",
  //     },
  //   ],
  // });
  const photos = await prisma.photo.createMany({
    data: [
      {
        dateOfCreation: new Date("1994-08-01"),
        title: "Holding Hands",
        photoName: "hands_holding.png",
        miniature: "hands_holding.png",
        placeholder: "hands_holding.png",
        photo_CategoryId: "Artistiques",
      },
      {
        dateOfCreation: new Date("1994-08-01"),
        title: "Gril Portrait",
        photoName: "girl_portrait.png",
        miniature: "girl_portrait.png",
        placeholder: "girl_portrait.png",
        photo_CategoryId: "Artistiques",
      },
      {
        dateOfCreation: new Date("1994-08-01"),
        title: "Holding Hands",
        photoName: "hands_holding.png",
        miniature: "hands_holding.png",
        placeholder: "hands_holding.png",
        photo_CategoryId: "Artistiques",
      },
      {
        dateOfCreation: new Date("1994-08-01"),
        title: "Gril Portrait",
        photoName: "girl_portrait.png",
        miniature: "girl_portrait.png",
        placeholder: "girl_portrait.png",
        photo_CategoryId: "Artistiques",
      },
      {
        dateOfCreation: new Date("1994-08-01"),
        title: "Holding Hands",
        photoName: "hands_holding.png",
        miniature: "hands_holding.png",
        placeholder: "hands_holding.png",
        photo_CategoryId: "Artistiques",
      },
      {
        dateOfCreation: new Date("1994-08-01"),
        title: "Gril Portrait",
        photoName: "girl_portrait.png",
        miniature: "girl_portrait.png",
        placeholder: "girl_portrait.png",
        photo_CategoryId: "Artistiques",
      },
      {
        dateOfCreation: new Date("1994-08-01"),
        title: "Holding Hands",
        photoName: "hands_holding.png",
        miniature: "hands_holding.png",
        placeholder: "hands_holding.png",
        photo_CategoryId: "Artistiques",
      },
      {
        dateOfCreation: new Date("1994-08-01"),
        title: "Gril Portrait",
        photoName: "girl_portrait.png",
        miniature: "girl_portrait.png",
        placeholder: "girl_portrait.png",
        photo_CategoryId: "Artistiques",
      },
      {
        dateOfCreation: new Date("1994-08-01"),
        title: "Holding Hands",
        photoName: "hands_holding.png",
        miniature: "hands_holding.png",
        placeholder: "hands_holding.png",
        photo_CategoryId: "Artistiques",
      },
      {
        dateOfCreation: new Date("1994-08-01"),
        title: "Gril Portrait",
        photoName: "girl_portrait.png",
        miniature: "girl_portrait.png",
        placeholder: "girl_portrait.png",
        photo_CategoryId: "Artistiques",
      },
      {
        dateOfCreation: new Date("1994-08-01"),
        title: "Holding Hands",
        photoName: "hands_holding.png",
        miniature: "hands_holding.png",
        placeholder: "hands_holding.png",
        photo_CategoryId: "Artistiques",
      },
      {
        dateOfCreation: new Date("1994-08-01"),
        title: "Gril Portrait",
        photoName: "girl_portrait.png",
        miniature: "girl_portrait.png",
        placeholder: "girl_portrait.png",
        photo_CategoryId: "Artistiques",
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
