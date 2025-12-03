//Feature A: Data Initialization and List Rendering
<div 
    x-data="{
        currentOrder: <?php echo json_encode($initialOrder ?? []); ?>,
        decrease(item) { 
            if (item.quantity > 1) item.quantity = Number(item.quantity) - 1;
        },
        increase(item) { 
            item.quantity = Number(item.quantity) + 1;
        },
        removeItem(id) {
            this.currentOrder = this.currentOrder.filter(i => i.id !== id);
        },
        total() {
            return this.currentOrder
                .reduce((sum, i) => sum + (i.price * i.quantity), 0)
                .toFixed(2);
        }
    }"
>
    <table class="table" id="order-items-table">
        <thead>
            <tr>
                <th>Item</th>
                <th class="text-center">Qty</th>
                <th class="text-end">Total</th>
                <th></th>
            </tr>
        </thead>

        <tbody id="order-items-body">
            <template x-for="item in currentOrder" :key="item.id">
                <tr>
                    <td x-text="item.name"></td>

                    <td class="text-center d-flex justify-content-center align-items-center">
                        <button class="btn btn-secondary btn-sm me-1" @click="decrease(item)">-</button>
                        <span class="mx-2" x-text="item.quantity"></span>
                        <button class="btn btn-secondary btn-sm ms-1" @click="increase(item)">+</button>
                    </td>

                    <td class="text-end" x-text="(item.price * item.quantity).toFixed(2)"></td>

                    <td class="text-center">
                        <button 
                            class="btn btn-outline-danger btn-sm" 
                            @click="removeItem(item.id)"
                        >X</button>
                    </td>
                </tr>
            </template>
        </tbody>
    </table>

    <div class="d-flex justify-content-between align-items-center fs-4 fw-bold mb-3">
        <span class="text-choco">Total Price:</span>
        <span class="text-choco">₱<span x-text="total()"></span></span>
    </div>
</div>
