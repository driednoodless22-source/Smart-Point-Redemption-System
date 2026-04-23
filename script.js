// โหลดข้อมูลจาก localStorage
let users = JSON.parse(localStorage.getItem("users")) || [];
let rewards = JSON.parse(localStorage.getItem("rewards")) || [
    {id:1, name:"คูปองน้ำดื่ม", cost:50}
];

// สมัครสมาชิก
function register(){
    let u = username.value;
    let p = password.value;

    users.push({username:u, password:p, points:0, role:"user"});
    localStorage.setItem("users", JSON.stringify(users));
    alert("สมัครสำเร็จ");
}

// Login
function login(){
    let u = username.value;
    let p = password.value;

    let user = users.find(x => x.username==u && x.password==p);

    if(user){
        localStorage.setItem("currentUser", JSON.stringify(user));

        if(user.role=="admin"){
            window.location="admin.html";
        }else{
            window.location="dashboard.html";
        }
    }else{
        alert("ข้อมูลไม่ถูกต้อง");
    }
}

// Dashboard โหลดข้อมูล
function loadDashboard(){
    let user = JSON.parse(localStorage.getItem("currentUser"));
    userPoints.innerText = user.points;

    rewardList.innerHTML = "";

    rewards.forEach(r=>{
        rewardList.innerHTML += `
        <p>${r.name} (${r.cost} แต้ม)
        <button onclick="redeem(${r.id})">แลก</button></p>
        `;
    });
}

// แลกแต้ม
function redeem(id){
    let user = JSON.parse(localStorage.getItem("currentUser"));
    let reward = rewards.find(r=>r.id==id);

    if(user.points >= reward.cost){
        user.points -= reward.cost;

        // อัปเดต users array
        users = users.map(u=> u.username==user.username ? user : u);

        localStorage.setItem("users", JSON.stringify(users));
        localStorage.setItem("currentUser", JSON.stringify(user));

        alert("แลกสำเร็จ");
        loadDashboard();
    }else{
        alert("แต้มไม่พอ");
    }
}

// Logout
function logout(){
    localStorage.removeItem("currentUser");
    window.location="index.html";
}

// Admin โหลดรางวัล
function loadAdmin(){
    adminRewardList.innerHTML="";
    rewards.forEach(r=>{
        adminRewardList.innerHTML += `<p>${r.name} (${r.cost} แต้ม)</p>`;
    });
}

// เพิ่มรางวัล
function addReward(){
    let name = rewardName.value;
    let cost = parseInt(rewardCost.value);

    rewards.push({id:Date.now(), name:name, cost:cost});
    localStorage.setItem("rewards", JSON.stringify(rewards));

    loadAdmin();
}
