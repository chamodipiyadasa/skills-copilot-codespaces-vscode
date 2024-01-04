function skillsMember() {
    var skills = document.getElementById("skills");
    var member = document.getElementById("member");
    var memberValue = member.value;
    var memberText = member.options[member.selectedIndex].text;
    if (memberValue == "1") {
        skills.style.display = "block";
    } else {
        skills.style.display = "none";
    }
}