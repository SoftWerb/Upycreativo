    function showModal(src) {
      document.getElementById("modalImage").src = src;
      document.getElementById("imageModal").style.display = "flex";
    }

    function closeModal() {
      document.getElementById("imageModal").style.display = "none";
    }