interface InventoryItem {
  item_id: string;
  item_name: string;
  category: string;
  quantity: number;
  price: number;
  supplier_name: string;
  stock_status: string;
  popular_item: string;
  comment: string;
}

let inventory: InventoryItem[] = [
  {
    item_id: 'ITM001',
    item_name: 'Samsung 65 TV',
    category: 'Electronics',
    quantity: 15,
    price: 1299.99,
    supplier_name: 'Samsung Australia',
    stock_status: 'In Stock',
    popular_item: 'Yes',
    comment: 'Best seller this month'
  },
  {
    item_id: 'ITM002',
    item_name: 'LG Washing Machine',
    category: 'Electronics',
    quantity: 5,
    price: 899.00,
    supplier_name: 'LG Electronics',
    stock_status: 'Low Stock',
    popular_item: 'No',
    comment: ''
  },
  {
    item_id: 'ITM003',
    item_name: 'Leather Sofa',
    category: 'Furniture',
    quantity: 3,
    price: 2499.00,
    supplier_name: 'Harvey Norman Furniture',
    stock_status: 'Low Stock',
    popular_item: 'Yes',
    comment: 'Floor model available'
  },
  {
    item_id: 'ITM004',
    item_name: 'Makita Drill Set',
    category: 'Tools',
    quantity: 0,
    price: 149.99,
    supplier_name: 'Makita',
    stock_status: 'Out of Stock',
    popular_item: 'No',
    comment: 'Restock pending'
  },
  {
    item_id: 'ITM005',
    item_name: 'Winter Jacket',
    category: 'Clothing',
    quantity: 25,
    price: 199.00,
    supplier_name: 'Kathmandu',
    stock_status: 'In Stock',
    popular_item: 'Yes',
    comment: ''
  }
];

function show_message(type: string, message: string): void {
  const msg_div = document.getElementById('message_area') as HTMLDivElement;
  msg_div.className = 'message ' + type;
  msg_div.innerHTML = message;
  setTimeout(function () {
    msg_div.innerHTML = '';
    msg_div.className = 'message';
  }, 4000);
}

function get_input_value(id: string): string {
  const el = document.getElementById(id) as HTMLInputElement;
  if (el) {
    return el.value.trim();
  }
  return '';
}

function clear_form(): void {
  const ids: string[] = [
    'input_id', 'input_name', 'input_category',
    'input_quantity', 'input_price', 'input_supplier',
    'input_stock', 'input_popular', 'input_comment'
  ];
  for (let i: number = 0; i < ids.length; i++) {
    const el = document.getElementById(ids[i]) as HTMLInputElement;
    if (el) {
      el.value = '';
    }
  }
}

function show_section(section_id: string): void {
  const sections = document.querySelectorAll('.content_section');
  for (let i: number = 0; i < sections.length; i++) {
    sections[i].classList.add('hidden');
  }
  const target = document.getElementById(section_id);
  if (target) {
    target.classList.remove('hidden');
  }
  if (section_id === 'section_all') {
    display_all_items();
  }
  if (section_id === 'section_popular') {
    display_popular_items();
  }
}

function validate_fields(
  item_id: string,
  item_name: string,
  category: string,
  quantity: string,
  price: string,
  supplier_name: string,
  stock_status: string,
  popular_item: string
): string {
  if (item_id === '') {
    return 'Item ID is required.';
  }
  if (item_name === '') {
    return 'Item Name is required.';
  }
  if (category === '') {
    return 'Please select a category.';
  }
  if (quantity === '') {
    return 'Quantity is required.';
  }
  if (isNaN(Number(quantity)) || Number(quantity) < 0) {
    return 'Quantity must be a number and cannot be negative.';
  }
  if (price === '') {
    return 'Price is required.';
  }
  if (isNaN(Number(price)) || Number(price) < 0) {
    return 'Price must be a number and cannot be negative.';
  }
  if (supplier_name === '') {
    return 'Supplier Name is required.';
  }
  if (stock_status === '') {
    return 'Please select a stock status.';
  }
  if (popular_item === '') {
    return 'Please select yes or no for Popular Item.';
  }
  return '';
}

function add_item(): void {
  const item_id: string       = get_input_value('input_id');
  const item_name: string     = get_input_value('input_name');
  const category: string      = get_input_value('input_category');
  const quantity: string      = get_input_value('input_quantity');
  const price: string         = get_input_value('input_price');
  const supplier_name: string = get_input_value('input_supplier');
  const stock_status: string  = get_input_value('input_stock');
  const popular_item: string  = get_input_value('input_popular');
  const comment: string       = get_input_value('input_comment');

  const error: string = validate_fields(
    item_id, item_name, category, quantity, price, supplier_name, stock_status, popular_item
  );

  if (error !== '') {
    show_message('error', error);
    return;
  }

  let already_exists: boolean = false;
  for (let i: number = 0; i < inventory.length; i++) {
    if (inventory[i].item_id === item_id) {
      already_exists = true;
      break;
    }
  }

  if (already_exists) {
    show_message('error', 'An item with ID ' + item_id + ' already exists. Please use a different ID.');
    return;
  }

  const new_item: InventoryItem = {
    item_id:       item_id,
    item_name:     item_name,
    category:      category,
    quantity:      Number(quantity),
    price:         Number(price),
    supplier_name: supplier_name,
    stock_status:  stock_status,
    popular_item:  popular_item,
    comment:       comment
  };

  inventory.push(new_item);
  show_message('success', item_name + ' was added successfully.');
  clear_form();
  display_all_items();
}

function load_item_for_edit(): void {
  const search_name: string = get_input_value('edit_name_input').toLowerCase();

  if (search_name === '') {
    show_message('error', 'Please enter an item name to load.');
    return;
  }

  let found_index: number = -1;
  for (let i: number = 0; i < inventory.length; i++) {
    if (inventory[i].item_name.toLowerCase() === search_name) {
      found_index = i;
      break;
    }
  }

  if (found_index === -1) {
    show_message('error', 'Could not find an item named ' + search_name + '.');
    return;
  }

  const found: InventoryItem = inventory[found_index];

  (document.getElementById('input_id') as HTMLInputElement).value       = found.item_id;
  (document.getElementById('input_name') as HTMLInputElement).value     = found.item_name;
  (document.getElementById('input_category') as HTMLInputElement).value = found.category;
  (document.getElementById('input_quantity') as HTMLInputElement).value = found.quantity.toString();
  (document.getElementById('input_price') as HTMLInputElement).value    = found.price.toString();
  (document.getElementById('input_supplier') as HTMLInputElement).value = found.supplier_name;
  (document.getElementById('input_stock') as HTMLInputElement).value    = found.stock_status;
  (document.getElementById('input_popular') as HTMLInputElement).value  = found.popular_item;
  (document.getElementById('input_comment') as HTMLInputElement).value  = found.comment;

  show_message('info', found.item_name + ' loaded. Make your changes then click Update Item.');
}

function update_item(): void {
  const item_id: string       = get_input_value('input_id');
  const item_name: string     = get_input_value('input_name');
  const category: string      = get_input_value('input_category');
  const quantity: string      = get_input_value('input_quantity');
  const price: string         = get_input_value('input_price');
  const supplier_name: string = get_input_value('input_supplier');
  const stock_status: string  = get_input_value('input_stock');
  const popular_item: string  = get_input_value('input_popular');
  const comment: string       = get_input_value('input_comment');

  const error: string = validate_fields(
    item_id, item_name, category, quantity, price, supplier_name, stock_status, popular_item
  );

  if (error !== '') {
    show_message('error', error);
    return;
  }

  let found_index: number = -1;
  for (let i: number = 0; i < inventory.length; i++) {
    if (inventory[i].item_name.toLowerCase() === item_name.toLowerCase()) {
      found_index = i;
      break;
    }
  }

  if (found_index === -1) {
    show_message('error', 'Could not find ' + item_name + '. Please load the item first.');
    return;
  }

  inventory[found_index] = {
    item_id:       item_id,
    item_name:     item_name,
    category:      category,
    quantity:      Number(quantity),
    price:         Number(price),
    supplier_name: supplier_name,
    stock_status:  stock_status,
    popular_item:  popular_item,
    comment:       comment
  };

  show_message('success', item_name + ' was updated successfully.');
  clear_form();
  display_all_items();
}

function delete_item(): void {
  const delete_name: string = get_input_value('delete_name_input');

  if (delete_name === '') {
    show_message('error', 'Please enter an item name to delete.');
    return;
  }

  let found_index: number = -1;
  for (let i: number = 0; i < inventory.length; i++) {
    if (inventory[i].item_name.toLowerCase() === delete_name.toLowerCase()) {
      found_index = i;
      break;
    }
  }

  if (found_index === -1) {
    show_message('error', 'Could not find an item named ' + delete_name + '.');
    return;
  }

  const item_name: string = inventory[found_index].item_name;

  const confirm_div = document.getElementById('confirm_area') as HTMLDivElement;
  confirm_div.innerHTML =
    '<div class="confirm_box">' +
      '<p>Are you sure you want to delete <strong>' + item_name + '</strong>? This cannot be undone.</p>' +
      '<button onclick="confirm_delete(' + found_index + ')" class="btn_danger">Yes, Delete</button>' +
      '<button onclick="cancel_delete()" class="btn_secondary">Cancel</button>' +
    '</div>';
}

function confirm_delete(index: number): void {
  const item_name: string = inventory[index].item_name;
  inventory.splice(index, 1);

  const confirm_div = document.getElementById('confirm_area') as HTMLDivElement;
  confirm_div.innerHTML = '';

  (document.getElementById('delete_name_input') as HTMLInputElement).value = '';
  show_message('success', item_name + ' was deleted.');
  display_all_items();
}

function cancel_delete(): void {
  const confirm_div = document.getElementById('confirm_area') as HTMLDivElement;
  confirm_div.innerHTML = '';
  show_message('info', 'Delete cancelled.');
}

function search_items(): void {
  const search_term: string = get_input_value('search_input').toLowerCase();

  if (search_term === '') {
    show_message('error', 'Please enter something to search for.');
    return;
  }

  const results: InventoryItem[] = [];
  for (let i: number = 0; i < inventory.length; i++) {
    if (inventory[i].item_name.toLowerCase().indexOf(search_term) !== -1) {
      results.push(inventory[i]);
    }
  }

  render_items_table(results, 'search_results', 'Results for ' + search_term);
}

function display_all_items(): void {
  render_items_table(inventory, 'all_items_display', 'All Inventory Items');
  render_items_table(inventory, 'all_items_table', 'All Inventory Items');
}

function display_popular_items(): void {
  const popular: InventoryItem[] = [];
  for (let i: number = 0; i < inventory.length; i++) {
    if (inventory[i].popular_item === 'Yes') {
      popular.push(inventory[i]);
    }
  }
  render_items_table(popular, 'popular_items_display', 'Popular Items');
}

function render_items_table(items: InventoryItem[], container_id: string, title: string): void {
  const container = document.getElementById(container_id) as HTMLDivElement;
  if (!container) {
    return;
  }

  if (items.length === 0) {
    container.innerHTML = '<p class="no_results">No items found.</p>';
    return;
  }

  let html: string = '<h3>' + title + ' (' + items.length + ' item';
  if (items.length !== 1) {
    html += 's';
  }
  html += ')</h3>';

  html += '<div class="table_wrapper"><table>';
  html += '<thead><tr>';
  html += '<th>ID</th><th>Name</th><th>Category</th><th>Qty</th>';
  html += '<th>Price</th><th>Supplier</th><th>Stock Status</th><th>Popular</th><th>Comment</th>';
  html += '</tr></thead><tbody>';

  for (let i: number = 0; i < items.length; i++) {
    const item: InventoryItem = items[i];
    const comment_text: string = item.comment !== '' ? item.comment : '-';

    html += '<tr>';
    html += '<td>' + item.item_id + '</td>';
    html += '<td><strong>' + item.item_name + '</strong></td>';
    html += '<td>' + item.category + '</td>';
    html += '<td>' + item.quantity + '</td>';
    html += '<td>$' + item.price.toFixed(2) + '</td>';
    html += '<td>' + item.supplier_name + '</td>';
   html += '<td>' + item.stock_status + '</td>';
    html += '<td>' + item.popular_item + '</td>';
    html += '<td>' + comment_text + '</td>';
    html += '</tr>';
  }

  html += '</tbody></table></div>';
  container.innerHTML = html;
}

window.onload = function () {
  display_all_items();
};