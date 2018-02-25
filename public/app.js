const populatecustomers = (customers) => {
    let ul = document.getElementById('customersemails');
    customers.forEach(customer => {
        let li = document.createElement('li');
        li.setAttribute('id', customer.email)
        let form = document.createElement('form');
        let dbutton = document.createElement('button');
        dbutton.setAttribute('id', customer.id)
        dbutton.setAttribute('onClick', 'deletecustomer(this.id)')
        let t = document.createTextNode('DELETE');
        dbutton.appendChild(t);
        form.appendChild(dbutton);
        li.appendChild(document.createTextNode(customer.email));
        li.appendChild(form)
        ul.appendChild(li);
    });
}
fetch('../api/customers')
    .then(result => {
        return result.json()
    })
    .then((data) => {
        populatecustomers(data)
    })

let createcustomer = () => {
    let customer = document.getElementById('email').value;
    fetch('./api/customers', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ customer: customer })

        })
        .then((result) => {
            result.json();
        })

    .catch(console.error);
}
let deletecustomer = (index) => {
    fetch(`../api/customers/${index}`, {
            method: 'delete'
        })
        .then((result) => {
            result.json();
            let dli = document.getElementById(index).parentNode.parentNode.id
            document.getElementById(dli).remove();
        })

    .catch(console.error);
}