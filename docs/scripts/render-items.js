const itemsContainer = document.getElementById("items");

const getItemsData = async () => {
  try {
    const response = await fetch("../items.json");
    const data = await response.json();
    return data?.items || [];
  } catch (e) {
    console.log("Error: ", e);
  }
};

const buildItem = (item) => {
  const itemElement = document.createElement("article");
  itemElement.classList = `item ${item.id}`;

  itemElement.innerHTML = `
    <p class="tags">${item.tags.toString(",")}</p>
    <h3>
      <a
        target="_blank"
        href="${item.link}"
        rel="noopener noreferrer"
        style="background-image: url(../images/item-${item.id}.png)"
      >
        <span>${item.title}</span>
      </a>
    </h3>
    <p class="desc">${item.desc}</p>
  `;

  return itemElement;
};

const renderItems = async () => {
  const itemsData = await getItemsData();

  if (!itemsData) return;

  itemsData.forEach((item) => {
    itemsContainer.appendChild(buildItem(item));
  });
};

window.onload = renderItems;
