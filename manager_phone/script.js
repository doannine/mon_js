
// Import Firebase từ CDN
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import {
    getFirestore,
    collection,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
    onSnapshot
} from "https://www.gstatic.com/firebasejs/11.4.0/firebase-firestore.js";

// Cấu hình Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDGBzpX-JXsRGnZ4Krln3ABWICyULUWNNo",
    authDomain: "crudphone-9e69a.firebaseapp.com",
    projectId: "crudphone-9e69a",
    storageBucket: "crudphone-9e69a.firebasestorage.app",
    messagingSenderId: "580297471397",
    appId: "1:580297471397:web:74a64f8ed5d4b4d9e5244c",
    measurementId: "G-CYD7D3263B"
};

// Khởi tạo Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Tham chiếu đến collection Phone
const productsRef = collection(db, "Phone");

// Lấy và hiển thị danh sách sản phẩm theo thời gian thực
const productList = document.getElementById("productList");
onSnapshot(productsRef, (snapshot) => {
    productList.innerHTML = ""; // Xóa danh sách cũ
    if (snapshot.empty) {
        productList.innerHTML = "<li>Chưa có sản phẩm nào.</li>";
        return;
    }
    snapshot.forEach((doc) => {
        const data = doc.data();
        console.log("Dữ liệu document:", data); // Debug để kiểm tra dữ liệu
        const li = document.createElement("li");
        li.innerHTML = `
                    Thương hiệu: ${data.brand || "Chưa xác định"}, Tên: ${data.name || "Chưa xác định"}, Giá: ${data.price || 0} VND
                    <button onclick="editProduct('${doc.id}', '${data.brand || ''}', '${data.name || ''}', ${data.price || 0})">Sửa</button>
                    <button onclick="deleteProduct('${doc.id}')">Xóa</button>
                `;
        productList.appendChild(li);
    });
}, (error) => {
    console.error("Lỗi khi lấy dữ liệu:", error);
    productList.innerHTML = "<li>Lỗi khi tải sản phẩm.</li>";
});

// Thêm hoặc sửa sản phẩm
document.getElementById("productForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const productId = document.getElementById("productId").value;
    const brand = document.getElementById("brand").value;
    const name = document.getElementById("name").value;
    const price = parseInt(document.getElementById("price").value);

    try {
        if (productId) {
            // Sửa sản phẩm
            const productRef = doc(db, "Phone", productId);
            await updateDoc(productRef, { brand, name, price });
            alert("Đã cập nhật sản phẩm!");
        } else {
            // Thêm sản phẩm mới
            await addDoc(productsRef, { brand, name, price });
            alert("Đã thêm sản phẩm!");
        }
        // Reset form
        document.getElementById("productForm").reset();
        document.getElementById("productId").value = "";
        document.querySelector("#productForm button").textContent = "Thêm sản phẩm";
    } catch (error) {
        console.error("Lỗi khi lưu sản phẩm:", error);
        alert("Có lỗi xảy ra!");
    }
});

// Hàm chỉnh sửa sản phẩm
window.editProduct = (id, brand, name, price) => {
    document.getElementById("productId").value = id;
    document.getElementById("brand").value = brand;
    document.getElementById("name").value = name;
    document.getElementById("price").value = price;
    document.querySelector("#productForm button").textContent = "Cập nhật";
};

// Hàm xóa sản phẩm
window.deleteProduct = async (id) => {
    if (confirm("Bạn có chắc muốn xóa sản phẩm này?")) {
        try {
            const productRef = doc(db, "Phone", id);
            await deleteDoc(productRef);
            alert("Đã xóa sản phẩm!");
        } catch (error) {
            console.error("Lỗi khi xóa:", error);
            alert("Có lỗi xảy ra!");
        }
    }
};



if ('WebSocket' in window) {
    (function () {
        function refreshCSS() {
            var sheets = [].slice.call(document.getElementsByTagName("link"));
            var head = document.getElementsByTagName("head")[0];
            for (var i = 0; i < sheets.length; ++i) {
                var elem = sheets[i];
                var parent = elem.parentElement || head;
                parent.removeChild(elem);
                var rel = elem.rel;
                if (elem.href && typeof rel != "string" || rel.length == 0 || rel.toLowerCase() == "stylesheet") {
                    var url = elem.href.replace(/(&|\?)_cacheOverride=\d+/, '');
                    elem.href = url + (url.indexOf('?') >= 0 ? '&' : '?') + '_cacheOverride=' + (new Date().valueOf());
                }
                parent.appendChild(elem);
            }
        }
        var protocol = window.location.protocol === 'http:' ? 'ws://' : 'wss://';
        var address = protocol + window.location.host + window.location.pathname + '/ws';
        var socket = new WebSocket(address);
        socket.onmessage = function (msg) {
            if (msg.data == 'reload') window.location.reload();
            else if (msg.data == 'refreshcss') refreshCSS();
        };
        if (sessionStorage && !sessionStorage.getItem('IsThisFirstTime_Log_From_LiveServer')) {
            console.log('Live reload enabled.');
            sessionStorage.setItem('IsThisFirstTime_Log_From_LiveServer', true);
        }
    })();
} else {
    console.error('Upgrade your browser. This Browser is NOT supported WebSocket for Live-Reloading.');
}
