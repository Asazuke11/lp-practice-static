"use strict";

/**
 * @type {object} HTMLの要素。
 */
const taskMonth = document.getElementById('taskmonth');
const taskStatus = document.getElementById('taskstatus');
const taskTitle = document.getElementById('tasktitle');
const taskDetail = document.getElementById('taskdetail');
const submitButton = document.getElementById('submit');
const tasktListTbody = document.getElementById('tasklist');


/**
 * @type {Array} タスク収納配列。
 * 
 * 要素
 * @type {object}
 * { month : 実施月,  status: 進捗,  title :タイトル,  detail: 概要}
 */
let tasks = [];



/**
 * サンプルのタスクデータを描画させる関数
 */
addSample();



//登録ボタンをクリックした時の動作
submitButton.onclick = () => {
  const task = {
    month: taskMonth.value,   // 実施月
    status: taskStatus.value, // 進捗
    title: taskTitle.value,   // タイトル
    detail: taskDetail.value  // 概要
  }
  //ガード句
  if(!task.month || !task.status || !task.title || !task.detail){
    alert('記入欄に空白があります。')
  }else{
    addtask(task);
    displayTaskList();
  }
}



/**
 * タスクデータを配列に挿入する関数
 * @param {object} task 
 */
function addtask (task) {
  tasks.push(task);
}




/**
 * タスクリストを描画する関数。
 */
function displayTaskList() {

  tasktListTbody.innerText = "";

  for (let i = 0; i < tasks.length; i++) {
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

    const task = tasks[i];

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

  }//for
}//func




/**
 * タスク削除＆タスクリストの再描画をする関数。
 * @param {number} deleteIndex 配列の要素番号。
 */
function deleteTask(deleteIndex) {
  tasks.splice(deleteIndex, 1);
  displayTaskList();
}





/**
 * タスクのサンプルを描画する関数。
 */
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