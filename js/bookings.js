const bookings = document.querySelectorAll('.bookings')

for(let i = 0; i < bookings.length; i++) {
    bookings[i].addEventListener("click", function () {

        if(this.classList.contains("selected")) {
            this.classList.remove("selected")
        }else {
            bookings.forEach(function(booking) {
                booking.classList.remove("selected")
            });
            this.classList.toggle("selected");
        }
    });
}