let requesting = false;

// POST BOOK
async function apiPost(route) {
    let conf = confirm('Proceed with this action?')
    if(!conf) return

    if (!requesting) {
        try {
            requesting = true;
            const NAME = getValue('bookName')
            const AUTHOR = getValue('bookAuthor')
            const PUBLISHER = getValue('bookPublisher')
            const YEARt = getValue('bookYear')
            const SUMMARY = getValue('bookSummary')
            if (NAME == '' || AUTHOR == '' || PUBLISHER == '' || YEARt == '') {
                alert('Missing text input.')
                return
            }

            const YEAR = parseInt(YEARt)
            if (Object.is(NaN, YEAR)) {
                alert('Invalid Year.')
                return
            }

            const res = await fetch(`${URL_REQUEST}/api/${route}/postBook`, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: NAME,
                    author: AUTHOR,
                    publisher: PUBLISHER,
                    year: YEAR,
                    summary: SUMMARY
                }),
            });
            const data = await res.json();
            console.log(data);

            if (data.status) {
                document.getElementById('resp').innerHTML = JSON.stringify(data.saved);
            } else {
                document.getElementById('resp').innerHTML = JSON.stringify(data.error);
            }

        } catch (err) {
            console.log(err);
        } finally {
            requesting = false;
        }
    } else {
        console.log("Request already running.");
    }
}
// POST E-BOOK (DIFFERENCE IN FORMAT)
async function apiPostE(route) {
    let conf = confirm('Proceed with this action?')
    if(!conf) return

    if (!requesting) {
        try {
            requesting = true;
            const NAME = getValue('ebookName')
            const AUTHOR = getValue('ebookAuthor')
            const PUBLISHER = getValue('ebookPublisher')
            const YEARt = getValue('ebookYear')
            const SUMMARY = getValue('ebookSummary')
            const FORMAT = getValue('ebookFormat')
            if (NAME == '' || AUTHOR == '' || PUBLISHER == '' || YEARt == '' || FORMAT == '') {
                alert('Missing text input.')
                return
            }

            const YEAR = parseInt(YEARt)
            if (Object.is(NaN, YEAR)) {
                alert('Invalid Year.')
                return
            }

            const res = await fetch(`${URL_REQUEST}/api/${route}/postBook`, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: NAME,
                    author: AUTHOR,
                    publisher: PUBLISHER,
                    year: YEAR,
                    summary: SUMMARY,
                    format: FORMAT
                }),
            });
            const data = await res.json();
            console.log(data);

            if (data.status) {
                document.getElementById('resp').innerHTML = JSON.stringify(data.saved);
            } else {
                document.getElementById('resp').innerHTML = JSON.stringify(data.error);
            }

        } catch (err) {
            console.log(err);
        } finally {
            requesting = false;
        }
    } else {
        console.log("Request already running.");
    }
}

// UPDATE BOOK
async function apiUpdateOne(route) {
    let conf = confirm('Proceed with this action?')
    if(!conf) return

    if (!requesting) {
        try {
            requesting = true;

            const IDt = getValue('bookIdModify')
            if (IDt == '') {
                alert('Missing ID input.')
                return
            }
            const ID = parseInt(IDt)
            if (Object.is(NaN, ID)) {
                alert('Invalid ID.')
                return
            }

            let updateObj = {}

            const NAME = getValue('bookNameModify')
            const AUTHOR = getValue('bookAuthorModify')
            const PUBLISHER = getValue('bookPublisherModify')
            const YEARt = getValue('bookYearModify')
            const SUMMARY = getValue('bookSummaryModify')

            let YEAR = null
            if (YEARt !== '') {
                YEAR = parseInt(YEARt)
                if (Object.is(NaN, YEAR)) {
                    alert('Invalid Year.')
                    return
                }
            }            

            if (NAME == '' && AUTHOR == '' && PUBLISHER == '' && YEARt == '' && SUMMARY == '') {
                alert('Missing ALL text input.')
                return
            }

            if (NAME !== '') updateObj.name = NAME;
            if (AUTHOR !== '') updateObj.author = AUTHOR;
            if (PUBLISHER !== '') updateObj.publisher = PUBLISHER;
            if (SUMMARY !== '') updateObj.summary = SUMMARY;
            if (YEARt !== '') updateObj.year = YEAR;

            const res = await fetch(`${URL_REQUEST}/api/${route}/updateOne?id=${parseInt(ID)}`, {
                method: "PATCH",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updateObj),
            });
            const data = await res.json();
            console.log(data);

            document.getElementById('resp').innerHTML = JSON.stringify(data);

        } catch (err) {
            console.log(err);
        } finally {
            requesting = false;
        }
    } else {
        console.log("Request already running.");
    }
}
// UPDATE E-BOOK
async function apiUpdateOneE(route) {
    let conf = confirm('Proceed with this action?')
    if(!conf) return

    if (!requesting) {
        try {
            requesting = true;

            const IDt = getValue('ebookIdModify')
            if (IDt == '') {
                alert('Missing ID input.')
                return
            }
            const ID = parseInt(IDt)
            if (Object.is(NaN, ID)) {
                alert('Invalid ID.')
                return
            }

            let updateObj = {}

            const NAME = getValue('ebookNameModify')
            const AUTHOR = getValue('ebookAuthorModify')
            const PUBLISHER = getValue('ebookPublisherModify')
            const YEARt = getValue('ebookYearModify')
            const SUMMARY = getValue('ebookSummaryModify')
            const FORMAT = getValue('ebookFormatModify')

            let YEAR = null
            if (YEARt !== '') {
                YEAR = parseInt(YEARt)
                if (Object.is(NaN, YEAR)) {
                    alert('Invalid Year.')
                    return
                }
            }
            
            if (NAME == '' && AUTHOR == '' && PUBLISHER == '' && YEARt == '' && SUMMARY == '' && FORMAT == '') {
                alert('Missing ALL text input.')
                return
            }

            if (NAME !== '') updateObj.name = NAME;
            if (AUTHOR !== '') updateObj.author = AUTHOR;
            if (PUBLISHER !== '') updateObj.publisher = PUBLISHER;
            if (SUMMARY !== '') updateObj.summary = SUMMARY;
            if (YEARt !== '') updateObj.year = YEAR;
            if (FORMAT !== '') updateObj.format = FORMAT;

            const res = await fetch(`${URL_REQUEST}/api/${route}/updateOne?id=${parseInt(ID)}`, {
                method: "PATCH",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updateObj),
            });
            const data = await res.json();
            console.log(data);

            document.getElementById('resp').innerHTML = JSON.stringify(data);

        } catch (err) {
            console.log(err);
        } finally {
            requesting = false;
        }
    } else {
        console.log("Request already running.");
    }
}

// GET FOR BOTH E-BOOKS AND BOOKS
async function apiGet(route, order) {
    if (!requesting) {
        try {
            requesting = true;
            const res = await fetch(`${URL_REQUEST}/api/${route}/getBooks?order=${order}`);
            const data = await res.json();
            console.log(data);

            document.getElementById('resp').innerHTML = JSON.stringify(data);
        } catch (err) {
            console.log(err);
        } finally {
            requesting = false;
        }
    } else {
        console.log("Request already running.");
    }
}

// DELETE ONE BOOK
async function apiDeleteOne(route) {
    let conf = confirm('Proceed with this action?')
    if(!conf) return

    if (!requesting) {
        try {
            requesting = true;

            const IDt = getValue('bookDeleteOne')
            if (IDt == '') {
                alert('Missing ID input.')
                return
            }
            const ID = parseInt(IDt)
            if (Object.is(NaN, ID)) {
                alert('Invalid ID.')
                return
            }
          
            const res = await fetch(`${URL_REQUEST}/api/${route}/deleteOne?id=${parseInt(ID)}`, {
                method: "DELETE",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
            });
            const data = await res.json();
            console.log(data);

            document.getElementById('resp').innerHTML = JSON.stringify(data);

        } catch (err) {
            console.log(err);
        } finally {
            requesting = false;
        }
    } else {
        console.log("Request already running.");
    }
}
// DELETE ONE E-BOOK
async function apiDeleteOneE(route) {
    let conf = confirm('Proceed with this action?')
    if(!conf) return

    if (!requesting) {
        try {
            requesting = true;

            const IDt = getValue('ebookDeleteOne')
            if (IDt == '') {
                alert('Missing ID input.')
                return
            }
            const ID = parseInt(IDt)
            if (Object.is(NaN, ID)) {
                alert('Invalid ID.')
                return
            }
          
            const res = await fetch(`${URL_REQUEST}/api/${route}/deleteOne?id=${parseInt(ID)}`, {
                method: "DELETE",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
            });
            const data = await res.json();
            console.log(data);

            document.getElementById('resp').innerHTML = JSON.stringify(data);

        } catch (err) {
            console.log(err);
        } finally {
            requesting = false;
        }
    } else {
        console.log("Request already running.");
    }
}

async function apiGetInventories(route) {
    if (!requesting) {
        try {
            requesting = true;
            const res = await fetch(`${URL_REQUEST}/api/${route}/getBookInventory`);
            const data = await res.json();
            console.log(data);

            document.getElementById('resp').innerHTML = JSON.stringify(data);
        } catch (err) {
            console.log(err);
        } finally {
            requesting = false;
        }
    } else {
        console.log("Request already running.");
    }
}

// DELETE BOOK INVENTORY
async function apiDeleteOneInventory(route) {
    let conf = confirm('Proceed with this action?')
    if(!conf) return

    if (!requesting) {
        try {
            requesting = true;

            const IDt = getValue('bookInventoryDeleteOne')
            if (IDt == '') {
                alert('Missing ID input.')
                return
            }
            const ID = parseInt(IDt)
            if (Object.is(NaN, ID)) {
                alert('Invalid ID.')
                return
            }
          
            const res = await fetch(`${URL_REQUEST}/api/${route}/deleteOneInventory?id=${ID}`, {
                method: "DELETE",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
            });
            const data = await res.json();
            console.log(data);

            document.getElementById('resp').innerHTML = JSON.stringify(data);

        } catch (err) {
            console.log(err);
        } finally {
            requesting = false;
        }
    } else {
        console.log("Request already running.");
    }
}
// DELETE E-BOOK INVENTORY
async function apiDeleteOneInventoryE(route) {
    let conf = confirm('Proceed with this action?')
    if(!conf) return

    if (!requesting) {
        try {
            requesting = true;

            const IDt = getValue('ebookInventoryDeleteOne')
            if (IDt == '') {
                alert('Missing ID input.')
                return
            }
            const ID = parseInt(IDt)
            if (Object.is(NaN, ID)) {
                alert('Invalid ID.')
                return
            }
          
            const res = await fetch(`${URL_REQUEST}/api/${route}/deleteOneInventory?id=${ID}`, {
                method: "DELETE",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
            });
            const data = await res.json();
            console.log(data);

            document.getElementById('resp').innerHTML = JSON.stringify(data);

        } catch (err) {
            console.log(err);
        } finally {
            requesting = false;
        }
    } else {
        console.log("Request already running.");
    }
}

// CREATE INVENTORY POR BOOK
async function apiPostInventory(route) {
    let conf = confirm('Proceed with this action?')
    if(!conf) return

    if (!requesting) {
        try {
            requesting = true;

            const IDt = getValue('bookInventoryId')
            if (IDt == '') {
                alert('Missing ID input.')
                return
            }
            const ID = parseInt(IDt)
            if (Object.is(NaN, ID)) {
                alert('Invalid Book ID.')
                return
            }

            const QUANTITYt = getValue('bookInventoryQuantity')
            if (QUANTITYt == '') {
                alert('Missing quantity input.')
                return
            }
            const QUANTITY = parseInt(QUANTITYt)
            if (Object.is(NaN, QUANTITY)) {
                alert('Invalid Inventory Quantity.')
                return
            }
            if (QUANTITY < 0) {
                alert('Invalid Inventory Quantity.')
                return
            }

            const res = await fetch(`${URL_REQUEST}/api/${route}/postBookInventory?bookId=${ID}`, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    quantity: QUANTITY
                }),
            });
            const data = await res.json();
            console.log(data);

            document.getElementById('resp').innerHTML = JSON.stringify(data);

        } catch (err) {
            console.log(err);
        } finally {
            requesting = false;
        }
    } else {
        console.log("Request already running.");
    }
}
// CREATE INVENTORY POR E-BOOK
async function apiPostInventoryE(route) {
    let conf = confirm('Proceed with this action?')
    if(!conf) return

    if (!requesting) {
        try {
            requesting = true;

            const IDt = getValue('ebookInventoryId')
            if (IDt == '') {
                alert('Missing ID input.')
                return
            }
            const ID = parseInt(IDt)
            if (Object.is(NaN, ID)) {
                alert('Invalid Book ID.')
                return
            }

            const QUANTITYt = getValue('ebookInventoryQuantity')
            if (QUANTITYt == '') {
                alert('Missing quantity input.')
                return
            }
            const QUANTITY = parseInt(QUANTITYt)
            if (Object.is(NaN, QUANTITY)) {
                alert('Invalid Inventory Quantity.')
                return
            }
            if (QUANTITY < 0) {
                alert('Invalid Inventory Quantity.')
                return
            }

            const res = await fetch(`${URL_REQUEST}/api/${route}/postBookInventory?bookId=${ID}`, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    quantity: QUANTITY
                }),
            });
            const data = await res.json();
            console.log(data);

            document.getElementById('resp').innerHTML = JSON.stringify(data);

        } catch (err) {
            console.log(err);
        } finally {
            requesting = false;
        }
    } else {
        console.log("Request already running.");
    }
}

// UPDATE BOOK INVENTORY
async function apiUpdateOneInventory(route) {
    let conf = confirm('Proceed with this action?')
    if(!conf) return

    if (!requesting) {
        try {
            requesting = true;

            const IDt = getValue('bookInventoryIdEdit')
            if (IDt == '') {
                alert('Missing Inventory ID input.')
                return
            }
            const ID = parseInt(IDt)
            if (Object.is(NaN, ID)) {
                alert('Invalid Inventory ID.')
                return
            }

            let updateObj = {}

            const QUANTITYt = getValue('bookInventoryQuantityEdit')
            if (QUANTITYt == '') {
                alert('Missing ALL text input.')
                return
            }

            let QUANTITY = null
            QUANTITY = parseInt(QUANTITYt)
            if (Object.is(NaN, QUANTITY)) {
                alert('Invalid Quantity.')
                return
            }
            if (QUANTITY < 0) {
                alert('Invalid Quantity.')
                return
            }

            updateObj.quantity = QUANTITY

            const res = await fetch(`${URL_REQUEST}/api/${route}/updateOneInventory?id=${ID}`, {
                method: "PATCH",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updateObj),
            });
            const data = await res.json();
            console.log(data);

            document.getElementById('resp').innerHTML = JSON.stringify(data);

        } catch (err) {
            console.log(err);
        } finally {
            requesting = false;
        }
    } else {
        console.log("Request already running.");
    }
}
// UPDATE E-BOOK INVENTORY
async function apiUpdateOneInventoryE(route) {
    let conf = confirm('Proceed with this action?')
    if(!conf) return

    if (!requesting) {
        try {
            requesting = true;

            const IDt = getValue('ebookInventoryIdEdit')
            if (IDt == '') {
                alert('Missing Inventory ID input.')
                return
            }
            const ID = parseInt(IDt)
            if (Object.is(NaN, ID)) {
                alert('Invalid Inventory ID.')
                return
            }

            let updateObj = {}

            const QUANTITYt = getValue('ebookInventoryQuantityEdit')
            if (QUANTITYt == '') {
                alert('Missing ALL text input.')
                return
            }

            let QUANTITY = null
            QUANTITY = parseInt(QUANTITYt)
            if (Object.is(NaN, QUANTITY)) {
                alert('Invalid Quantity.')
                return
            }
            if (QUANTITY < 0) {
                alert('Invalid Quantity.')
                return
            }

            updateObj.quantity = QUANTITY

            const res = await fetch(`${URL_REQUEST}/api/${route}/updateOneInventory?id=${ID}`, {
                method: "PATCH",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updateObj),
            });
            const data = await res.json();
            console.log(data);

            document.getElementById('resp').innerHTML = JSON.stringify(data);

        } catch (err) {
            console.log(err);
        } finally {
            requesting = false;
        }
    } else {
        console.log("Request already running.");
    }
}

const getValue = (id) => {
    return document.getElementById(id).value;
}