function maskpassword(pass){
    let str="";
    for(let i=0;i<pass.length;i++){
        str += "*";
    }
    return str
}
function copytext(txt){
    navigator.clipboard.writeText(txt).then(
    ()=>{
        document.querySelector(".alert").classList.remove("alert");
        // alert("copied to clipboard" + txt);
    },
    ()=>{
        alert("failed to copy");
    }
    
  ) 
}
const deletepassword = (website) => {
    let data = localStorage.getItem("passwords");
    let arr = JSON.parse(data);
    arrupdated = arr.filter((e) => {
        return e.website != website
    })
    localStorage.setItem("passwords", JSON.stringify(arrupdated));
    alert(`successfully deleted ${website}s from password manager`);
    showpasswords();
}
let showpasswords = () => {
    let tb = document.querySelector("table");
    let data = localStorage.getItem("passwords");
    if (data == null || JSON.parse(data).length == 0) {
        tb.innerHTML = "No data found";
    } else {
        tb.innerHTML = ` <tr>
                <th>website</th>
                <th>username</th>
                <th>password</th>
                <th>delete</th>
            </tr>`
        let arr = JSON.parse(data);
        let str = "";
        for (let i = 0; i < arr.length; i++) {
            const element = arr[i];
            str += `<tr>
                <td>${element.website}<img onclick="copytext('${element.website}')" src="copy.svg" alt="Copy Button Icon" width="18" height="18"></td>
                <td>${element.username}<img onclick="copytext('${element.username}')" src="copy.svg" alt="Copy Button Icon" width="18" height="18"></td>
                <td>${maskpassword(element.password)}<img onclick="copytext('${element.password}')" src="copy.svg" alt="Copy Button Icon" width="18" height="18"></td>
                <td><button class="btnsn" onclick="deletepassword('${element.website}')">delete</button></td>
            </tr>`
        }

        tb.innerHTML = tb.innerHTML + str;
    }
    website.value = "";
    username.value = "";
    password.value = "";
}
showpasswords();
document.querySelector('.btn').addEventListener('click', (e) => {
    e.preventDefault();
    console.log('clicked');
    console.log(username.value, password.value);
    let passwords = localStorage.getItem("passwords");
    console.log(passwords);
    if (passwords == null) {
        let json = [];
        json.push({ website: website.value, username: username.value, password: password.value });
        localStorage.setItem("passwords", JSON.stringify(json));
    } else {
        let json = JSON.parse(passwords);
        json.push({ website: website.value, username: username.value, password: password.value });
        localStorage.setItem("passwords", JSON.stringify(json));
    }
    showpasswords();
})