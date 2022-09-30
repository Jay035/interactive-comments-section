import juliusomoAvatar from './assets/avatars/image-juliusomo.png';
import amyrobsonAvatar from './assets/avatars/image-amyrobson.png';
import maxBlagunAvatar from './assets/avatars/image-maxblagun.png';
import ramsesmironAvatar from './assets/avatars/image-ramsesmiron.png';
import { UserAuth } from '../context/AuthContext';

export const currentUser = [
  {
    "image": { 
      "png": juliusomoAvatar,
      "webp": "./images/avatars/image-juliusomo.webp"
    },
    "username": "juliusomo"
  },
]
export const commentData = async () => {
  return [
    {
      "id": 1,
      "userId": 1,
      "parentId": null,
      "content": "Impressive! Though it seems the drag feature could be improved. But overall it looks incredible. You've nailed the design and the responsiveness at various breakpoints works really well.",
      "createdAt": "2022-06-24T22:54:20.261Z",
      "score": 12,
      "userDetails": {
        "image": { 
          "png": amyrobsonAvatar,
          "webp": "./images/avatars/image-amyrobson.webp"
        },
        "username": "amyrobson"
      }
    },
    {
      "id": 2,
      "userId": 2,
      "parentId": null,
      "content": "Woah, your project looks awesome! How long have you been coding for? I'm still new, but think I want to dive into React as well soon. Perhaps you can give me an insight on where I can learn React? Thanks!",
      "createdAt": "2022-06-28T12:34:20.261Z",
      "score": 5,
      "userDetails": {
        "image": { 
          "png": maxBlagunAvatar,
          "webp": "./images/avatars/image-maxblagun.webp"
        },
        "username": "maxblagun"
      },
    },
    {
      "id": 3,
      "userId": 2,
      "parentId": 2,
      "content": "If you're still new, I'd recommend focusing on the fundamentals of HTML, CSS, and JS before considering React. It's very tempting to jump ahead but lay a solid foundation first.",
      "createdAt": "2022-07-11T22:44:20.261Z",
      "score": 4,
      "replyingTo": "maxblagun",
      "userDetails": {
        "image": { 
          "png": ramsesmironAvatar,
          "webp": "./images/avatars/image-ramsesmiron.webp"
        },
        "username": "ramsesmiron"
      }
    },
    {
      "id": 4,
      "userId": 2,
      "parentId": 2,
      "content": "I couldn't agree more with this. Everything moves so fast and it always seems like everyone knows the newest library/framework. But the fundamentals are what stay constant.",
      "createdAt": "2022-07-14T23:43:07.900Z",
      "score": 2,
      "replyingTo": "ramsesmiron",
      "userDetails": {
        "image": { 
          "png": juliusomoAvatar,
          "webp": "./images/avatars/image-juliusomo.webp"
        },
        "username": "juliusomo"
      }
    },
  ]
}


export async function createComment (text, parentId = null) {
  const { user } = UserAuth();
  console.log(user.email)
  return {
    id: Math.random().toString(36).substr(2, 9),
    content: text,
    parentId,
    userId: "1",
    score: 0,
    // replyingTo,
    userDetails: {
      image: { 
        png: juliusomoAvatar,
      },
      username: user.email
    },
    createdAt: new Date().toISOString(),
    
  }
}

export const updateComment = async (text) => {
  return { text };
}

export const deleteComment = async () => {
  return {};
}