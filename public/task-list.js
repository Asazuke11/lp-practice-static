"use strict";

const taskMonth = document.getElementById('taskmonth');     // 実施月
const taskStatus = document.getElementById('taskstatus');   // 進捗
const taskTitle = document.getElementById('tasktitle');     // タイトル
const taskDetail = document.getElementById('taskdetail');   // 概要
const submitButton = document.getElementById('submit');     // 登録ボタン
const tasktListTbody = document.getElementById('tasklist'); // タスクリスト


// { month: 実施月, status: 進捗, title: タイトル, detail: 概要 }
let tasks = [];
addSample();

submitButton.onclick = () => {
  const task = {
    month: taskMonth.value,   // 実施月
    status: taskStatus.value, // 進捗
    title: taskTitle.value,   // タイトル
    detail: taskDetail.value  // 概要
  }
  addtask(task);
  displayTaskList();
}

function addtask (task) {
  tasks.push(task);
}

function displayTaskList() {
  tasktListTbody.innerText = "";
  for (let i = 0; i < tasks.length; i++) {
    const task = tasks[i];
    const taskTr = document.createElement('tr');
    const monthTd = document.createElement('td');
    const statusTd = document.createElement('td');
    const titleTd = document.createElement('td');
    const detailTd = document.createElement('td');
    const deleteTd = document.createElement('td');

    const deleteButton = document.createElement('button');

    deleteButton.innerText = "削除";
    deleteButton.onclick = () => {
      deleteTask(i);
    }

    monthTd.innerText = task.month;
    statusTd.innerText = task.status;
    titleTd.innerText = task.title;
    detailTd.innerText = task.detail;

    tasktListTbody.appendChild(taskTr);
    deleteTd.appendChild(deleteButton);
    taskTr.appendChild(monthTd);
    taskTr.appendChild(statusTd);
    taskTr.appendChild(titleTd);
    taskTr.appendChild(detailTd);
    taskTr.appendChild(deleteTd);
  }
}

function deleteTask(deleteIndex) {
  tasks.splice(deleteIndex, 1);
  displayTaskList();
}

function addSample(){
  const task = {
    month: '2021-07',
    status: '済',
    title: 'A社経営統合プロジェクト',
    detail: '経営統合に伴う業務プロセス統合プロジェクト。\nプロジェクトリーダー（メンバー４人）として担当。\nＱＤＣ目標いずれも達成。ＣＳ評価で５をいただいた。'
  }
  addtask(task);
  displayTaskList();
}