const giftBox = document.getElementById('giftBox');
const message = document.getElementById('message');
const birthdayText = document.getElementById("birthdayText");
const birthdayMusic = document.getElementById("birthdayMusic");

const texts = [
    "Chúc mừng sinh nhật công chúa của tớ – người con gái luôn tỏa sáng theo cách rất riêng của mình. 🌸 Hôm nay là ngày cậu cất tiếng cười giữa bao lo toan, là khoảnh khắc nhẹ nhàng giữa những ngày ôn thi căng thẳng. Tớ biết kỳ thi THPT sắp tới đang khiến cậu phải dồn hết tâm sức, nhưng đừng quên dành cho mình một chút dịu dàng trong ngày đặc biệt này, nhé?",
    "Tuổi mới, mong cậu luôn mạnh mẽ, vững vàng và giữ vững niềm tin vào bản thân. Tớ tin rằng cậu sẽ vượt qua tất cả, không chỉ bằng kiến thức, mà còn bằng trái tim đầy nhiệt huyết và lòng kiên trì đáng ngưỡng mộ. Dù phía trước có bao thử thách, tớ sẽ luôn âm thầm cổ vũ cậu từng bước.",
    "Chúc cậu một sinh nhật thật ấm áp, bình yên – và một mùa thi thật thành công, trọn vẹn. Tớ tin vào cậu, như cách cậu từng âm thầm tin vào chính mình. 💖🎂📚",
    " Đậu Nguyện Vọng 1 nhasaaaa , cuối cùng chúc công chúa của anh tất cả trừ vất vả 💖💖💖 "
];

giftBox.addEventListener('click', () => {
    giftBox.style.display = 'none';
    setTimeout(() => {
        message.style.display = 'block';

        for (let i = 0; i < 50; i++) {
            const confetti = document.createElement('div');
            confetti.classList.add('confetti');
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 70%, 60%)`;
            confetti.style.animationDelay = `${Math.random() * 5}s`;
            document.body.appendChild(confetti);
        }
    }, 1000);
    birthdayMusic.play();
});

function typeWriter(texts, element, textIndex = 0, i = 0) {
    if (textIndex < texts.length) {
        const text = texts[textIndex];
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            setTimeout(() => typeWriter(texts, element, textIndex, i + 1), 40); // Tốc độ gõ
        } else {
            setTimeout(() => {
                element.innerHTML += '<br>'; // Xóa nội dung cũ
                typeWriter(texts, element, textIndex + 1); // Chuyển sang đoạn văn tiếp theo
            }, 2000); // Đợi 2 giây rồi chuyển quan đoạn khác
        }
    } else {
        // Thêm gif
        setTimeout(() => {
            const imgGift = document.createElement('div');
            imgGift.classList.add('img-gift');
            message.appendChild(imgGift);
        }, 1500);
    }
}

giftBox.addEventListener("click", () => {
    message.classList.remove("hidden");
    message.classList.add("show");

    setTimeout(() => {
        typeWriter(texts, birthdayText);
    }, 3500);
});
