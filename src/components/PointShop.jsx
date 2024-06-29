import React from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";

const items = [
  {
    id: 1,
    title: "치킨기프티콘",
    image:
      "https://firebasestorage.googleapis.com/v0/b/wpoint-1d1be.appspot.com/o/360_F_128438027_1eqBs0aN7hD9aeIpgmFu6LqNqpts3Fdu.jpg?alt=media&token=f04eca8b-816e-4afc-b524-8f4d8fc325f1",
    description: "Description for Item 1",
    price: 100,
  },
  {
    id: 2,
    title: "피자기프티콘",
    image:
      "https://firebasestorage.googleapis.com/v0/b/wpoint-1d1be.appspot.com/o/%E1%84%83%E1%85%A1%E1%84%8B%E1%85%AE%E1%86%AB%E1%84%85%E1%85%A9%E1%84%83%E1%85%B3%20(1).jpeg?alt=media&token=86d619eb-3eeb-432d-a4fe-b044874cb266",
    description: "Description for Item 2",
    price: 200,
  },
  // Add more items as needed
];

const PointShop = () => {
  const currentPoints = 500; // Example current points, you can replace it with actual data
  return (
    <section>
      <div className="relative w-full h-0" style={{ paddingBottom: "40%" }}>
        <div className="absolute inset-0 flex items-center justify-center">
          <img
            src="https://firebasestorage.googleapis.com/v0/b/wpoint-1d1be.appspot.com/o/KakaoTalk_Photo_2024-06-24-22-46-30.jpeg?alt=media&token=70070c2f-4375-442f-8059-4a78f60680c5"
            alt="Your Image Description"
            className="w-full h-full object-cover"
          />
          <h1 className="absolute text-white text-5xl font-serif">PointShop</h1>
        </div>
      </div>
      <div className="bg-white text-black p-12">
        <div className=" top-4 right-4 bg-pink-600 text-white px-4 py-2 rounded-full text-xl font-semibold shadow-lg">
          현재 포인트: {currentPoints}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((item) => (
            <div
              key={item.id}
              className="rounded-lg shadow-md cursor-pointer p-6 flex flex-col justify-center items-center transform hover:scale-105 transition ease-in-out"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-48 object-cover object-center mb-4"
              />
              <div className="text-center">
                <div className="text-2xl font-bold mb-2">{item.title}</div>
                <div className="text-lg mb-4">{item.description}</div>
                <div className="text-xl font-semibold mb-4">
                  포인트: {item.price}
                </div>
                <div className="flex justify-center">
                  <button className="bg-pink-800 text-white px-6 py-2 rounded-full flex items-center">
                    <FaShoppingCart className="mr-2" /> 구매하기
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PointShop;
