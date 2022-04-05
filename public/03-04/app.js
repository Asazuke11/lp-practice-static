"use strict";
const fs = require("fs");
const readline = require("readline");
const rs = fs.createReadStream("./popu_source.csv");
const rl = readline.createInterface({
  input : rs
});

const populationMap = new Map(); // key:年代　value:年代別総人口

const date2022 = "2022年3月"

const age_0_9   = "10歳未満";
const age_10_99 = "10代～90代";
const age_100_  = "100歳以上";
const fileName = './test.txt';

rl.on('line', lineString => {
  lineString = lineString.replace(/\"/g, '');
  const columns = lineString.split(',');
  if(columns[3] === "総人口" && columns[5] === "男女計" && columns[9] !== "総数" && columns[13] === date2022){
    const age = parseInt(columns[7]);
    const population = parseInt(columns[15]);
    if(age < 10){
      if(populationMap.has(age_0_9)){
        populationMap.set(age_0_9, populationMap.get(age_0_9) + population);
      }else{
        populationMap.set(age_0_9,population);
      }
    }//if(age < 10)
    if(age > 10 && age <100){
      if(populationMap.has(age_10_99)){
        populationMap.set(age_10_99, populationMap.get(age_10_99) + population);
      }else{
        populationMap.set(age_10_99,population);
      }
    }//if(age > 10 && age <100)
    if(age >= 100){
      if(populationMap.has(age_100_)){
        populationMap.set(age_100_, populationMap.get(age_100_) + population);
      }else{
        populationMap.set(age_100_,population);
      }
    }
  }//if(columns~)
});

rl.on('close', () => {
  const populationArrays = Array.from(populationMap).sort((pair1, pair2) => {
    return pair2[1] - pair1[1];
  });
  const output_text_1 = date2022 + "現在の年代別総人口ランキング [万人] \n";
  fs.unlinkSync(fileName);//既存のファイルを削除
  fs.appendFileSync(fileName, output_text_1, 'utf8');
  for (let i = 0; i < populationArrays.length; i++) {
    const output_ranking = `${i + 1}位 : ${populationArrays[i][0]} ${populationArrays[i][1]} \n`
    fs.appendFileSync(fileName, output_ranking, 'utf8');
  }
});