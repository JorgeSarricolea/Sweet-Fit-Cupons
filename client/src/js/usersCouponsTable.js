import { getUsersCoupons } from "@/js/handlers/handlerUsersCoupons.js";
import handleClick from "@/components/buttons/Button.astro";

(async function () {
  const usersCoupons = await getUsersCoupons();

  const container = document.createElement("div");
  container.classList.add(
    "h-full",
    "w-full",
    "rounded-3xl",
    "shadow-2xl",
    "p-4",
    "overflow-x-auto"
  );

  const table = document.createElement("table");
  table.classList.add("text-center", "w-full", "text-primary");

  const thead = document.createElement("thead");
  thead.classList.add("border-solid", "border-b-4");

  const headerRow = document.createElement("tr");
  headerRow.classList.add("text-xs", "md:text-lg");

  const headers = [
    "Email",
    "Cupón",
    "Fecha de vencimiento",
    "Fecha de aplicación",
    "Acciones",
  ];
  headers.forEach((headerText) => {
    const th = document.createElement("th");
    th.textContent = headerText;
    headerRow.appendChild(th);
  });

  thead.appendChild(headerRow);
  table.appendChild(thead);

  const tbody = document.createElement("tbody");

  usersCoupons.forEach((userCoupon) => {
    const tr = document.createElement("tr");
    tr.classList.add("text-xs", "md:text-lg", "border-solid", "border-b-2");
    tr.id = userCoupon.id;

    const td1 = document.createElement("td");
    td1.classList.add("p-2");
    td1.textContent = userCoupon.email || "N/A";
    tr.appendChild(td1);

    const td2 = document.createElement("td");
    td2.classList.add("p-2");
    td2.textContent = userCoupon.userCouponCode || "N/A";
    tr.appendChild(td2);

    const td3 = document.createElement("td");
    td3.classList.add("p-2");
    td3.textContent = userCoupon.couponExpirationDate
      ? userCoupon.couponExpirationDate
      : "N/A";
    tr.appendChild(td3);

    const td4 = document.createElement("td");
    td4.classList.add("p-2");
    td4.textContent = userCoupon.applicationDate
      ? userCoupon.applicationDate
      : "N/A";
    tr.appendChild(td4);

    const td5 = document.createElement("td");
    td5.classList.add("p-2", "font-bold");

    if (userCoupon.applicationDate) {
      td5.textContent = "Cupón validado";
    } else if (userCoupon.userCouponCode) {
      const button = document.createElement("button");
      button.className = "update-user-coupon-btn";
      button.setAttribute("data-params", userCoupon.id);
      button.textContent = "Validar cupón";
      button.addEventListener("click", handleClick);
      td5.appendChild(button);
    } else {
      const button = document.createElement("button");
      button.className = "update-user-coupon-btn";
      button.setAttribute("data-params", userCoupon.id);
      button.textContent = "Enviar cupón";
      button.addEventListener("click", handleClick);
      td5.appendChild(button);
    }

    tr.appendChild(td5);

    const td6 = document.createElement("td");
    const deleteIcon = document.createElement("i");
    deleteIcon.classList.add(
      "delete-user-coupon-btn",
      "p-2",
      "fa-solid",
      "fa-trash",
      "text-primary",
      "text-2xl",
      "cursor-pointer",
      "hover:text-secondary"
    );
    deleteIcon.setAttribute("data-userCouponId", userCoupon.id);
    td6.appendChild(deleteIcon);
    tr.appendChild(td6);

    tbody.appendChild(tr);
  });

  table.appendChild(tbody);
  container.appendChild(table);
  const divContainer = document.querySelector(".users-coupons-table");

  divContainer.appendChild(container);

  const deleteIcons = document.querySelectorAll(".delete-user-coupon-btn");
  deleteIcons.forEach((deleteIcon) => {
    deleteIcon.addEventListener("click", async function () {
      const userCouponId = deleteIcon.getAttribute("data-userCouponId");

      if (userCouponId) {
        try {
          await deleteUsersCoupon(userCouponId);
          // location.reload();
        } catch (error) {
          console.log("Failed to delete user-coupon association:", error);
        }
      } else {
        console.log("Failed to delete: userCouponId is undefined");
      }
    });
  });

  const updateUserCouponBtns = document.querySelectorAll(
    ".update-user-coupon-btn"
  );
  updateUserCouponBtns.forEach((updateUserCouponBtn) => {
    updateUserCouponBtn.addEventListener("click", async function () {
      const userCouponId = updateUserCouponBtn.getAttribute("data-params");

      if (userCouponId) {
        try {
          await updateUserCoupon(userCouponId);
          // location.reload();
        } catch (error) {
          console.log("Failed to send coupon:", error);
        }
      } else {
        console.log("Failed to send: userCouponId is undefined");
      }
    });
  });
})();
