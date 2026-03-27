import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-help',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './help.component.html',
  styleUrls: ['../../app.css']
})
export class HelpComponent {

  open_faq_index: number = -1;

  faqs: { question: string; answer: string }[] = [
    {
      question: 'How do I add a new item?',
      answer: 'Go to the Inventory page. Fill in all the fields in the Add / Update Item form and click Add Item. The item will show up in the table straight away.'
    },
    {
      question: 'How do I edit an item?',
      answer: 'Go to the Inventory page. Type the exact item name in the Load Item to Edit box and click Load Item. The form will fill in with that item. Make your changes then click Update Item.'
    },
    {
      question: 'How do I delete an item?',
      answer: 'Go to the Inventory page. Type the exact item name in the Delete Item box and click Delete Item. A confirmation box will appear. Click Yes Delete to confirm or Cancel to go back.'
    },
    {
      question: 'Why does the Item ID need to be unique?',
      answer: 'Each item needs its own ID so the system can tell them apart. If you try to add an item with an ID that already exists you will get an error. Try using a format like ITM006 or ITM007 to keep things consistent.'
    },
    {
      question: 'How does search work?',
      answer: 'Go to the Search page. Type part of an item name and click Search. You can also filter by category or stock status to narrow things down. The search is not case sensitive so typing tv will still find Samsung 65 TV.'
    },
    {
      question: 'How do I see only popular items?',
      answer: 'Go to the Inventory page and click the Popular Items button above the table. This will show only items where Popular Item is set to Yes.'
    },
    {
      question: 'Does data save when I close the browser?',
      answer: 'No. This app stores data in memory only. If you refresh the page or close the tab all changes will be lost and the app will go back to the default sample data.'
    },
    {
      question: 'Why won\'t my form submit?',
      answer: 'Check that all required fields are filled in. Quantity and Price must be valid numbers. If something is wrong a red message will appear at the top of the page telling you what to fix.'
    }
  ];

  toggle_faq(index: number): void {
    if (this.open_faq_index === index) {
      this.open_faq_index = -1;
    } else {
      this.open_faq_index = index;
    }
  }
}