const fs = require('fs');
const path = require('path');

const date = new Date().toISOString().split('T')[0];
const postsDirs = ['_posts/en', '_posts/zh'];

// 获取命令行参数
const lang = process.argv[2];

let dirsToCreate = postsDirs;
if (lang === 'zh' || lang === 'en') {
  dirsToCreate = [`_posts/${lang}`];
}

dirsToCreate.forEach((dir) => {
  const files = fs.readdirSync(dir).filter(file => file.startsWith(date));
  const index = files.length + 1;
  const fileName = `${date}-${String(index).padStart(2, '0')}.md`;
  const filePath = path.join(dir, fileName);

  const template = `---
index: ${index}
title: 
description: 
date: ${date}
author: 
keywords:
tags:
categories: 
---

`;

  fs.writeFileSync(filePath, template);
  console.log(`新文章已創建: ${filePath}`);
});

