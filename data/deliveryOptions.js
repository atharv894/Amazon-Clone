import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";

export const deliveryOptions = [
  {
    id: "1",
    deliveryDays: 7,
    priceCents: 0,
  },
  {
    id: "2",
    deliveryDays: 3,
    priceCents: 499,
  },
  {
    id: "3",
    deliveryDays: 1,
    priceCents: 999,
  },
];

export function getDeliveryOption(deliveryOptionId) 
{
  let deliveryOption;

  deliveryOptions.forEach((option) => {
    if (option.id === deliveryOptionId) deliveryOption = option;
  });

  return deliveryOption || deliveryOptions[0];
}

function isWeekend(day) {
  return day === "Saturday" || day === "Sunday";
}

export function calculateDeliveryDate(deliveryDays) 
{
  let today = dayjs();
  let deliveryDate = dayjs();
  let remainingDate = deliveryDays;

  while (remainingDate > 0) {
    deliveryDate = deliveryDate.add(1, "days");

    const dayName = deliveryDate.format("dddd");

    if (!isWeekend(dayName)) {
      remainingDate--;
    }
  }

  return deliveryDate;
}
