// Feature A: Data Initialization and List Rendering
let currentOrder = []; // Array of { id, name, price, quantity }

function renderOrder() {
    const $orderBody = $('#order-items-body');
    const $orderTotal = $('#order-total');
    let total = 0;

    $orderBody.empty(); // Clear the table body

    $.each(currentOrder, function(index, item) {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        const $row = $('<tr>');
        $row.html(`
            <td>${item.name}</td>
            <td class="text-center d-flex align-items-center justify-content-center">
                <button class="btn btn-secondary btn-sm me-1 decrease-btn" data-id="${item.id}">-</button>
                <span class="mx-2">${item.quantity}</span>
                <button class="btn btn-secondary btn-sm ms-1 increase-btn" data-id="${item.id}">+</button>
            </td>
            <td class="text-end">${itemTotal.toFixed(2)}</td>
            <td class="text-center">
                <button class="btn btn-outline-danger btn-sm remove-btn" data-id="${item.id}">X</button>
            </td>
        `);
        $orderBody.append($row);
    });

    $orderTotal.text(total.toFixed(2));
}

$(document).ready(function() {
    // Initialize with any existing data if needed, e.g., from localStorage or API
    // For now, assume currentOrder is initialized empty
    renderOrder();
});

// Feature B: Toggling UI Elements (e.g., Modal)
$(document).ready(function() {
    // Assuming a modal with id 'order-modal' and a button with id 'toggle-modal-btn'
    $('#toggle-modal-btn').on('click', function() {
        $('#order-modal').toggleClass('show');
    });

    // Optional: Close modal when clicking outside
    $(document).on('click', function(event) {
        if (!$(event.target).closest('#order-modal, #toggle-modal-btn').length) {
            $('#order-modal').removeClass('show');
        }
    });
});

// Feature C: Live Calculation (Quantity x Price)
$(document).ready(function() {
    // Assuming quantity inputs have class 'quantity-input' and are inside table rows
    $('#order-items-body').on('input', '.quantity-input', function() {
        const $row = $(this).closest('tr');
        const quantity = parseInt($(this).val(), 10) || 0;
        const price = parseFloat($row.find('.price').text()) || 0;
        const itemTotal = quantity * price;
        $row.find('.item-total').text(itemTotal.toFixed(2));

        // Recalculate overall total
        let total = 0;
        $('.item-total').each(function() {
            total += parseFloat($(this).text()) || 0;
        });
        $('#order-total').text(total.toFixed(2));
    });
});

// Feature D: Dynamic Deletion
$(document).ready(function() {
    // Assuming remove buttons have class 'remove-btn' and data-id attribute
    $('#order-items-body').on('click', '.remove-btn', function() {
        const itemId = $(this).data('id');
        // Remove from currentOrder array (assuming it's accessible)
        currentOrder = currentOrder.filter(item => item.id !== itemId);
        // Remove the row from DOM
        $(this).closest('tr').remove();
        // Recalculate total
        let total = 0;
        currentOrder.forEach(item => {
            total += item.price * item.quantity;
        });
        $('#order-total').text(total.toFixed(2));
    });
});
