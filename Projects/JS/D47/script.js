const users = [
  {
    username: "Aarav Sharma",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
    profession: "Frontend Developer",
    description: "Specializes in building responsive and interactive user interfaces using React and modern CSS."
  },
  {
    username: "Priya Verma",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
    profession: "UI/UX Designer",
    description: "Passionate about creating intuitive designs and enhancing user experiences across web and mobile apps."
  },
  {
    username: "Rohan Mehta",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d",
    profession: "Backend Developer",
    description: "Works with Node.js and databases to build scalable and secure server-side applications."
  },
  {
    username: "Neha Kapoor",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80",
    profession: "Data Analyst",
    description: "Analyzes data trends and creates insights using Python, SQL, and visualization tools."
  },
  {
    username: "Kabir Singh",
    image: "https://images.unsplash.com/photo-1775831726736-3369f057988a?q=80&w=1022&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    profession: "DevOps Engineer",
    description: "Focuses on CI/CD pipelines, cloud infrastructure, and automating deployment processes."
  }
];


var sum=''

users.forEach(function(elem){
    sum=sum+`<div class="card">
            <img src=${elem.image} alt="">
            <h3>${elem.username}</h3>
            <h4>${elem.profession}</h4>
            <p>${elem.description}</p>
        </div>`
})

var main=document.querySelector('main')

main.innerHTML=sum

