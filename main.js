class Product {
    constructor (name,price,year) {
        this.name = name;
        this.price = price;
        this.year = year;
    }
}

class UserInterface {
    addProduct (product) {

        const productList = document.getElementById ('product-list');
        const element = document.createElement('div');
        element.innerHTML = `
            <div class="card text-center mb-4">
                <div class = "card-body">
                    <strong> Product</strong>: ${product.name}
                    <strong> Price</strong>: ${product.price}
                    <strong> Year</strong>: ${product.year}
                    <a href="#" class= "btn btn-danger" name="delete">Delete</a>
                </div>
            </div>
        `;
        productList.appendChild(element);
        

    }

    resetForm (){
        document.getElementById('product-form').reset();
    }

    removeProduct (element) {
        if (element.name === 'delete'){
            element.parentElement.parentElement.parentElement.remove ();
            this.showMessage ('Product Deleted Successfuly', "danger");
        }

    }

    showMessage (message, cssClass) {

        const div= document.createElement ('div');
        div.className = `alert alert-${cssClass} mt-3`;
        div.appendChild(document.createTextNode(message));
        
        //Mostrando en el DOM 
        const container = document.querySelector('.container');
        const app = document.querySelector('#App');
        container.insertBefore(div, app);
        setTimeout(function () {
            document.querySelector('.alert').remove();
        }, 3000)

    }
}


// DOM EVENTS

document.getElementById('product-form').addEventListener('submit', function (e) {

    const name = document.getElementById('name').value;
    const price = document.getElementById('price').value;
    const year = document.getElementById('year').value;

    const product = new Product (name,price,year);

    const userInterface= new UserInterface();

    if (name === ''|| price === '' || year === '') {
    return  userInterface.showMessage ('Please complete the fields', 'info');
    }
    userInterface.addProduct(product);
    userInterface.resetForm();
    userInterface.showMessage('Product Added Successfully', 'success');

    e.preventDefault();

});


document.getElementById ('product-list').addEventListener('click', function (e) {

    const userInterace = new UserInterface ();
    userInterace.removeProduct(e.target);
});