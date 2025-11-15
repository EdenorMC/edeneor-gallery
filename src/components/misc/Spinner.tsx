import { useEffect, useState } from "react";

export function Spinner() {
  const colors = ["text-primary", "text-yellow-500", "text-red-500"];
  const [colorIndex, setColorIndex] = useState(0);

  useEffect(() => {
    let timer = setTimeout(() => {
      setColorIndex(1);
      timer = setTimeout(() => {
        setColorIndex(2);
      }, 5000);
    }, 2000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <>
      <div
        className={
          "mx-auto mt-5 h-16 w-16 animate-spin rounded-full border-4 border-solid " +
          "d border-current border-r-transparent align-[-0.125em] text-primary transition-colors" +
          `ease-out motion-reduce:animate-[spin_1.5s_linear_infinite] ${colors[colorIndex]}`
        }
        role="status"
      />
      {colorIndex === 2 && (
        <p className="text-center text-red-500">
          Загрузка подозрительно долгая. <br />
          Это может указывать на неполадки с подключением к серверу. <br />
          Попробуйте позже или свяжитесь с администрацией.
        </p>
      )}
    </>
  );
}
