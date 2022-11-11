const baseUrl = "https://platzi-avo.vercel.app";

const appNode = document.querySelector("#app");

const formatPrice = (price) => {
  const newPrice = new window.Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "EUR",
  }).format(price);

  return newPrice;
};
//web api
//Nos conectamos al servidor
//Promise -> async/await

window
  .fetch(`${baseUrl}/api/avo`)
  //Se procesa la respuesta y se convierte en JSON
  .then((respuesta) => respuesta.json())
  //JSON -> Data -> Renderizar info en el browser
  .then((responseJson) => {
    const allItems = [];

    responseJson.data.forEach((item) => {
      // Crear imagen
      const image = document.createElement("img");
      image.src = `${baseUrl}${item.image}`;
      image.className =
        "h-16 w-16 md:h-24 md:w-24 rounded-full mx-auto md:mx-0 md:mr-6";

      // Crear title
      const title = document.createElement("h2");
      title.className = "text-lg";
      title.textContent = item.name;

      // Crear price
      const price = document.createElement("div");
      price.className = "text-gray-600";
      price.textContent = formatPrice(item.price);

      // Crear div para title y price
      const titleAndPrice = document.createElement("div");
      titleAndPrice.className = "text-center md:text-left";
      titleAndPrice.append(title, price);

      // Crear card
      const card = document.createElement("div");
      card.className = "md:flex bg-green-50 rounded-lg p-6 hover:bg-green-300";
      card.append(image, titleAndPrice);

      // Se inserta todo en el contenedor principal
      const container = document.createElement("div");
      container.appendChild(card);

      allItems.push(container);
    });
    appNode.className = "mt-10 grid grid-cols-2 gap-2";
    appNode.append(...allItems);
  });
