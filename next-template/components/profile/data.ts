export type ProfileLocale = "tr" | "en"

export const profileMedia = {
  avatar:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuAhq_jWJsCv_ho5WBDPZzlW-EvJFKVSYsSE3LT4TtxrYY5btwWGZyEA7HNTh24c9R85uDkFbOKzqtBsWH1PKnqcg5xVUzXynjUTbzr_6P8uK3gu1cMlijWNsHA2ujolFLh0SpewU6JrFG3GYymg-h2xdDzGdIhRDu4y1Lj328HmKt97pldwUkuvvtVTVlFCoVFR3eabXqXZQcCDpA-RGzr7FlXAOis06azuNUsn1GrfLDowuyx1xPgsraNfAjgiIxFk44KmLDRE7A",
  cover:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuCdSkrTutpSSqcff2MBYMr-yMXaHCQ-uts68wLBTYbxIz3a22rF55rAAKeNQKmCl12yIZDa-cGgdq8GGhHXfk2lL9g68DMlUI7WVqXUdOjrmlsHl72EvLONGAaJYeT0W5u6_nSgBzyO4ImUkOJLDYwFGmB2zZ7pTNLJVumOYo-5Q4AzQPvC-15p6O8_tsTeq3ZVDg6v8CpNn5Lx2AxW5kynweVwKi27TW29_NRWt0_PQ5_MEMrXS3xOxnG1_ok49aMM4fNTq4dqaQ",
  post: "https://lh3.googleusercontent.com/aida-public/AB6AXuBli-vhQYvyR3fJlzeQWF5X_qgOL4cftJYxSrY4orPRJZIkXkob2eLB_T20nDTIkOplqQMWkbExcixBKeDlTAXyQcoJ-UpaLlRABdu0A7mTIBKTO8scN66xoiLsYFo2t3KeG8Mh26f8LNK_WdxvIhUzkQRiXKcwSx00kQARgLCSEq-ov5hSI2RHNawoUTlSdw57lR-RPlcuo1iVFm9Tu_L9sG_qW0thyT_s5ZckvZEb1EcQ2V9fLBMPcb8LSOTxed91ogL55cwEzQ",
}

export const profileContent = {
  name: "John Doe",
  email: "lorem@ipsum.com",
  followersCount: "2,566",
  followingCount: "2,566",
  socials: ["Facebook", "Instagram", "LinkedIn", "Twitter"],
  postDate: "Lorem ipsum",
  postBody:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  likes: "20",
  commenter: "Lorem Ipsum",
  commentDate: "Lorem ipsum",
  commentBody:
    "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
}

export const profileCopy = {
  tr: {
    profile: "Profil",
    followers: "Takipçiler",
    friends: "Arkadaşlar",
    gallery: "Galeri",
    following: "Takip",
    about: "Hakkında",
    aboutText:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    liveAt: "Lorem ipsum",
    country: "dolor sit",
    role: "Lorem ipsum",
    company: "consectetur adipiscing",
    school: "elit sed do",
    studied: "Lorem",
    social: "Sosyal",
    placeholder: "Ne düşündüğünü burada paylaş...",
    image: "Görsel",
    stream: "Yayın",
    post: "Paylaş",
    comment: "Yorum yaz...",
    more: "Diğer",
    commentAction: "Yorum",
    share: "Paylaş",
  },
  en: {
    profile: "Profile",
    followers: "Followers",
    friends: "Friends",
    gallery: "Gallery",
    following: "Following",
    about: "About",
    aboutText:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    liveAt: "Lorem ipsum",
    country: "dolor sit",
    role: "Lorem ipsum",
    company: "consectetur adipiscing",
    school: "elit sed do",
    studied: "Lorem",
    social: "Social",
    placeholder: "Share what you are thinking here...",
    image: "Image",
    stream: "Streaming",
    post: "Post",
    comment: "Write a comment...",
    more: "More",
    commentAction: "Comment",
    share: "Share",
  },
} as const
