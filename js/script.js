const btn = document.getElementById("loginBtn");
const uname = document.getElementById("uname");
const psw = document.getElementById("psw");
const container = document.querySelector(".loginbuttonbox");

container.addEventListener("mousemove", function (e) {
    if (uname.value !== "" && psw.value !== "") {
        moveAway(e);
    }
});

function moveAway(e) {
    const rect = btn.getBoundingClientRect();

    let btnX = rect.left + rect.width / 2;
    let btnY = rect.top + rect.height / 2;

    let mouseX = e.clientX;
    let mouseY = e.clientY;

    let dx = btnX - mouseX;
    let dy = btnY - mouseY;

    let distance = Math.sqrt(dx * dx + dy * dy);
    if (distance === 0) return;

    if (distance < 120) {
        let moveX = dx / distance;
        let moveY = dy / distance;

        let speed = 20 + (120 - distance) * 0.3;

        let newLeft = btn.offsetLeft + moveX * speed;
        let newTop = btn.offsetTop + moveY * speed;

        const maxX = container.clientWidth - btn.offsetWidth;
        const maxY = container.clientHeight - btn.offsetHeight;

        let hitLeft = newLeft <= 0;
        let hitRight = newLeft >= maxX;
        let hitTop = newTop <= 0;
        let hitBottom = newTop >= maxY;

        if (hitLeft || hitRight || hitTop || hitBottom) {
            newLeft = hitLeft ? maxX : hitRight ? 0 : newLeft;
            newTop = hitTop ? maxY : hitBottom ? 0 : newTop;
        }

        newLeft = Math.max(0, Math.min(maxX, newLeft));
        newTop = Math.max(0, Math.min(maxY, newTop));

        btn.style.left = newLeft + "px";
        btn.style.top = newTop + "px";
        btn.style.transform = "none";
    }
}