const db = require("./connection");
const { User, Post } = require("../models");
const { faker } = require("@faker-js/faker");

db.once("open", async () => {
  await User.deleteMany();
  await Post.deleteMany();

  const users = [];
  const posts = [];

  const category = [
    "Breast Cancer",
    "Lung Cancer",
    "Prostate Cancer",
    "Skin Cancer",
    "Ovarian Cancer",
    "Leukemia",
    "Lymphoma",
    "Brain Cancer",
    "Bladder Cancer",
    "Kidney Cancer",
    "Liver Cancer",
    "Thyroid Cancer",
    "Stomach Cancer",
    "Cervical Cancer",
    "Bone Cancer",
    "Sarcoma",
  ];

  const userTitles = [
    "Diagnosis Day",
    "Treatment Options",
    "Support Network",
    "Coping Strategies",
    "Celebrating Wins",
    "Self-Care",
    "Living with Uncertainty",
    "Finding Joy",
    "Overcoming Fear",
    "The Power of Hope",
    "Complementary Therapies",
    "Treatment Decisions",
    "Building Resilience",
    "Managing Relationships",
    "Inspiration",
    "Healthy Lifestyle",
    "Mindfulness",
    "Positive Mindset",
    "Emotional Well-being",
    "Life After Cancer",
    "Empowerment",
    "Strength and Courage",
    "Survivor Stories",
    "Advocacy",
    "Gratitude",
  ];

  for (let i = 0; i < 6; i++) {
    const userData = {
      username: faker.internet.userName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    };

    users.push(userData);
  }

  const newUsers = await User.insertMany(users);

  console.log("Users seeded");

  for (let i = 0; i < 25; i++) {
    const postData = {
      postTitle: userTitles[Math.floor(Math.random() * userTitles.length)],
      postText: faker.lorem.paragraphs(),
      category: category[Math.floor(Math.random() * category.length)],
      username: users[Math.floor(Math.random() * users.length)].username,
    };

    posts.push(postData);
  }

  const newPosts = await Post.insertMany(posts);
  console.log("Posts Seeded");

  process.exit();
});
