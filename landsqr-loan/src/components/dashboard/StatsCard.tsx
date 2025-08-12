import React from "react";
import Image from "next/image";
import Styles from "@/styles/Stats.module.scss";

const StatsCard = () => {
  const StatsCardElement = [
    {
      id: "users",
      title: "USERS",
      content: "2,453",
      icon: "/images/img_icon_purple_a400.svg",
    },
    {
      id: "active users",
      title: "ACTIVE USERS",
      content: "2,453",
      icon: "/images/img_icon_deep_purple_a400.svg",
    },
    {
      id: "user with loan",
      title: "USERS WITH LOANS",
      content: "12,453",
      icon: "/images/img_icon_red_400.svg",
    },
    {
      id: "user with savings",
      title: "USERS WITH SAVINGS",
      content: "102,453",
      icon: "/images/img_icon_pink_a200.svg",
    },
  ];

  return (
    <div className={Styles.container}>
      {StatsCardElement.map((stat) => (
        <div key={stat.id} className={Styles.card}>
          <div>
            <Image
              src={stat.icon}
              alt={stat.title}
              width={40}
              height={40}
              priority
            />
            <h3>{stat.title}</h3>
            <p>{stat.content}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsCard;
