function zoomImage(image) {
  if (image.style.transform === "scale(1.5)") {
    image.style.transform = "scale(1)";
    image.style.zIndex = "auto";
  } else {
    image.style.transform = "scale(1.5)";
    image.style.zIndex = "2";
  }
  
  // Agregar el evento de hover a la imagen cuando se hace zoom
  image.addEventListener("mouseenter", function() {
    image.style.transform = "scale(1.5)";
  });

  // Agregar el evento de dejar de pasar el cursor sobre la imagen cuando se hace zoom
  image.addEventListener("mouseleave", function() {
    image.style.transform = "scale(1)";
  });
}

function buscarProducto() {
  // Obtener la entrada del usuario
  var input = document.querySelector(".buscar-form input").value.toLowerCase();

  // Obtener todos los productos
  var productos = document.querySelectorAll(".producto");

  // Recorrer todos los productos y ocultar aquellos que no coinciden con la búsqueda
  productos.forEach(function (producto) {
    var nombreProducto = producto.querySelector(".nombre-producto").textContent.toLowerCase();
    var coincide = nombreProducto.includes(input);

    // Mostrar u ocultar el producto según la coincidencia
    producto.style.display = coincide ? "block" : "none";
  });

  // Prevenir que el formulario se envíe y la página se actualice
  return false;
}

// Agregar un event listener al campo de búsqueda para activar la búsqueda instantánea
var inputBusqueda = document.querySelector(".buscar-form input");
inputBusqueda.addEventListener("input", buscarProducto);


var carrito = [];
function agregarAlCarrito(nombre, precio, stock) {
  // Verificar si hay stock disponible
  if (stock <= 0) {
    alert("Producto sin stock disponible.");
    return;
  }

  // Verificar si el producto ya está en el carrito
  var productoExistente = carrito.find(function (producto) {
    return producto.nombre === nombre;
  });

  if (productoExistente) {
    // Si el producto ya está en el carrito, verificar si la cantidad no supera el stock
    if (productoExistente.cantidad < stock) {
      productoExistente.cantidad++;
    } else {
      alert("No hay suficiente stock disponible.");
    }
  } else {
    // Si el producto no está en el carrito, agregarlo con cantidad 1
    var producto = {
      nombre: nombre,
      precio: precio,
      cantidad: 1,
      stock: stock,
    };
    carrito.push(producto);
  }


  // Actualizar el carrito visualmente
  actualizarCarritoVisual();

  // Mostrar automáticamente el carrito después de agregar un producto
  mostrarCarrito();

  // Mostrar mensaje de confirmación con el nombre del producto
  alert(`${nombre} ha sido agregado al carrito correctamente.`);
}




function actualizarCarritoVisual() {
  var listaCarrito = document.getElementById("lista-carrito");
  var totalCarrito = document.getElementById("total-carrito");

  // Limpiar la lista actual
  listaCarrito.innerHTML = "";

  // Actualizar la lista del carrito
  carrito.forEach(function (producto, index) {
    var listItem = document.createElement("li");

    // Añadir el nombre, cantidad y precio del producto
    listItem.textContent = `${producto.nombre} - $${producto.precio.toFixed(
      2
    )} - Cantidad: ${producto.cantidad}`;

    // Añadir botones de eliminar, aumentar y disminuir la cantidad
    var eliminarButton = document.createElement("button");
    eliminarButton.textContent = "❌";
    eliminarButton.onclick = function () {
      eliminarDelCarrito(index);
    };

    var aumentarCantidadButton = document.createElement("button");
    aumentarCantidadButton.textContent = "➕";
    aumentarCantidadButton.onclick = function () {
      aumentarCantidad(index);
    };

    var disminuirCantidadButton = document.createElement("button");
    disminuirCantidadButton.textContent = "➖";
    disminuirCantidadButton.onclick = function () {
      disminuirCantidad(index);
    };

    listItem.appendChild(eliminarButton);
    listItem.appendChild(aumentarCantidadButton);
    listItem.appendChild(disminuirCantidadButton);

    listaCarrito.appendChild(listItem);
  });

  // Calcular el total
  var total = carrito.reduce(function (acc, producto) {
    return acc + producto.precio * producto.cantidad;
  }, 0);

  totalCarrito.textContent = total.toFixed(2);
}


function aumentarCantidad(index) {
  // Verificar si la cantidad no supera el stock
  if (carrito[index].cantidad < carrito[index].stock) {
    carrito[index].cantidad++;
    actualizarCarritoVisual();
  } else {
    alert("No hay suficiente stock disponible.");
  }
}

function disminuirCantidad(index) {
  // Verificar si la cantidad es mayor a 1 antes de disminuir
  if (carrito[index].cantidad > 1) {
    carrito[index].cantidad--;
    actualizarCarritoVisual();
  }
}




function eliminarDelCarrito(index) {
  carrito.splice(index, 1);
  actualizarCarritoVisual();
}

function mostrarCarrito() {
  var carritoPopup = document.getElementById("carrito-popup");
  carritoPopup.style.display = "block";
}

function cerrarCarrito() {
  var carritoPopup = document.getElementById("carrito-popup");
  carritoPopup.style.display = "none";
}

// Descargar el archivo
pdf.save("orden_compra_glittering.pdf", function() {
  // Mostrar un mensaje de confirmación
  alert("La orden de compra se ha descargado correctamente.");
});

function comprarCarrito() {
  // Obtener todos los elementos de la lista de carrito
  var itemsCarrito = document.getElementById("lista-carrito").getElementsByTagName("li");

  // Verificar si hay elementos en el carrito
  if (itemsCarrito.length === 0) {
    alert("El carrito está vacío. Agregue productos antes de comprar.");
    return;
  }

  // Crear el mensaje con los detalles de la compra
  var mensaje = "¡Hola! Te comparto el resumen de la compra:\n\n";
  for (var i = 0; i < itemsCarrito.length; i++) {
    mensaje += `- ${itemsCarrito[i].textContent.trim()} \n`;
  }

  var total = document.getElementById("total-carrito").textContent;
  mensaje += `\nTotal: ${total}`;

  var enlaceWhatsApp = "https://api.whatsapp.com/send/?phone=543876550649&text=" + encodeURIComponent(mensaje);

  // Abrir el enlace de WhatsApp
  window.location.href = enlaceWhatsApp;
}


