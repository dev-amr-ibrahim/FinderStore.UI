import { Component, computed, inject } from '@angular/core';
import { RouterLink, ActivatedRoute } from '@angular/router';

interface InformationPage {
  eyebrow: string;
  title: string;
  introduction: string;
  sections: { title: string; paragraphs: string[]; items?: string[] }[];
}

const PAGES: Record<string, InformationPage> = {
  careers: {
    eyebrow: 'Careers', title: 'Build the future of shopping with us.',
    introduction: 'We are a customer-first team creating a more thoughtful way to discover and shop for the things people love.',
    sections: [
      { title: 'Why Finder', paragraphs: ['We value curiosity, ownership and kind collaboration. Every role has a direct impact on the customer experience.'] },
      { title: 'How we work', paragraphs: ['We set clear goals, share feedback early and make decisions with our customers in mind. We welcome people with different perspectives and backgrounds.'], items: ['Meaningful, customer-focused work', 'An inclusive, respectful workplace', 'Learning and growth opportunities'] },
      { title: 'Open opportunities', paragraphs: ['We do not have a suitable opening listed right now. Please check back soon or share your details with our team at careers@finder.example.'] }
    ]
  },
  press: {
    eyebrow: 'Press', title: 'News and media resources.',
    introduction: 'Find the latest Finder announcements, company facts and media contacts in one place.',
    sections: [
      { title: 'About Finder', paragraphs: ['Finder is an online destination for carefully selected products and a simple, dependable shopping experience.'] },
      { title: 'Media enquiries', paragraphs: ['For interviews, brand assets or press questions, contact press@finder.example. We aim to reply within two business days.'] },
      { title: 'Brand assets', paragraphs: ['Our name is Finder. Please use current logo files and do not alter the mark, colours or proportions.'] }
    ]
  },
  'help-center': {
    eyebrow: 'Support', title: 'How can we help?',
    introduction: 'Quick answers for ordering, delivery, returns and your account. If you still need help, our support team is here for you.',
    sections: [
      { title: 'Orders and delivery', paragraphs: ['You can review order status from your account once your order has been confirmed. Delivery estimates are shown at checkout and in your dispatch email.'] },
      { title: 'Returns and refunds', paragraphs: ['Eligible items can be returned within 14 days of delivery. Visit Returns & Exchanges for the full process and eligibility details.'] },
      { title: 'Need more help?', paragraphs: ['Send us a message through the Contact page. Please include your order number when your question relates to an order.'] }
    ]
  },
  'shipping-info': {
    eyebrow: 'Support', title: 'Shipping information.',
    introduction: 'We work to get every order to you safely and with clear delivery updates.',
    sections: [
      { title: 'Processing time', paragraphs: ['Orders are typically prepared within 1–2 business days. Orders placed on weekends or public holidays begin processing on the next business day.'] },
      { title: 'Delivery', paragraphs: ['Available delivery methods, costs and estimated arrival dates are shown at checkout before payment. Tracking details are sent when your order leaves our warehouse.'] },
      { title: 'Delivery issues', paragraphs: ['Please check your tracking link first. If an order is delayed, damaged or marked delivered but cannot be found, contact us with your order number and we will investigate.'] }
    ]
  },
  'returns-exchanges': {
    eyebrow: 'Support', title: 'Returns & exchanges.',
    introduction: 'If something is not quite right, eligible purchases may be returned within 14 days of delivery.',
    sections: [
      { title: '14-day return window', paragraphs: ['Start your return within 14 calendar days after your order is delivered. Items must be unused, unwashed, in their original condition and returned with all tags and packaging.'] },
      { title: 'How to request a return', paragraphs: ['Contact our support team with your order number and the item you would like to return. We will confirm eligibility and provide the next steps.'], items: ['Keep your proof of purchase', 'Pack items securely', 'Use a tracked service where instructed'] },
      { title: 'Refunds and exchanges', paragraphs: ['After inspection, eligible refunds are issued to the original payment method. We will confirm timing and availability for exchanges when you contact us. Original shipping charges are non-refundable unless an item is faulty or sent in error.'] }
    ]
  },
  'size-guide': {
    eyebrow: 'Shopping guide', title: 'Find your best fit.',
    introduction: 'Sizing can vary by product, so check the product description alongside this guide before ordering.',
    sections: [
      { title: 'How to measure', paragraphs: ['Use a soft measuring tape and keep it level. Measure your chest at the fullest point, waist at its natural point and hips at the fullest point. Compare your measurements with the product-specific size information.'] },
      { title: 'Between sizes?', paragraphs: ['Choose the larger size for a more relaxed fit. For tailored or fitted items, review the product notes and fabric stretch information.'] },
      { title: 'Need fit advice?', paragraphs: ['Our support team can help with product-specific questions. Send the product name, your usual size and any fit preferences through our Contact page.'] }
    ]
  },
  'privacy-policy': {
    eyebrow: 'Legal', title: 'Privacy policy.', introduction: 'We respect your privacy and use personal information only as needed to provide and improve our services.',
    sections: [{ title: 'Information we collect', paragraphs: ['We collect information you provide when placing an order, creating an account or contacting us, such as your name, contact details, delivery address and order information.'] }, { title: 'How we use it', paragraphs: ['We use this information to fulfil orders, provide support, prevent fraud and improve Finder. We do not sell your personal information.'] }, { title: 'Your choices', paragraphs: ['You may request access, correction or deletion of your personal information, subject to applicable law. Contact privacy@finder.example for privacy requests.'] }]
  },
  'terms-of-service': {
    eyebrow: 'Legal', title: 'Terms of service.', introduction: 'These terms describe the rules for using Finder and purchasing from our store.',
    sections: [{ title: 'Using our store', paragraphs: ['Please provide accurate information and use Finder lawfully. We may update product availability, prices or content when necessary.'] }, { title: 'Orders', paragraphs: ['An order confirmation acknowledges receipt of your order; acceptance occurs when we dispatch it. We may cancel an order where payment cannot be authorised or where there is an obvious error.'] }, { title: 'Questions', paragraphs: ['For questions about these terms, please contact legal@finder.example.'] }]
  },
  'cookie-policy': {
    eyebrow: 'Legal', title: 'Cookie policy.', introduction: 'Cookies help Finder operate reliably, remember preferences and understand how our store is used.',
    sections: [{ title: 'What cookies do', paragraphs: ['Cookies are small text files stored on your device. Essential cookies enable core features such as the shopping cart and security.'] }, { title: 'Your control', paragraphs: ['You can manage or remove cookies through your browser settings. Blocking essential cookies may affect how the site works.'] }, { title: 'Contact', paragraphs: ['For questions about cookies and privacy, contact privacy@finder.example.'] }]
  }
};

@Component({
  selector: 'app-information-page', standalone: true, imports: [RouterLink],
  template: `
    <section class="bg-primary-50 dark:bg-gray-800 border-b border-primary-100 dark:border-gray-700">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 text-center">
        <p class="text-primary-600 dark:text-primary-400 font-semibold text-sm tracking-widest uppercase">{{ page().eyebrow }}</p>
        <h1 class="mt-3 text-4xl sm:text-5xl font-display font-bold text-gray-900 dark:text-white text-balance">{{ page().title }}</h1>
        <p class="mt-5 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">{{ page().introduction }}</p>
      </div>
    </section>
    <main class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      @for (section of page().sections; track section.title) {
        <section class="pb-10 mb-10 border-b last:border-0 last:mb-0 last:pb-0 border-gray-200 dark:border-gray-700">
          <h2 class="text-2xl font-display font-bold text-gray-900 dark:text-white mb-4">{{ section.title }}</h2>
          @for (paragraph of section.paragraphs; track paragraph) { <p class="text-gray-600 dark:text-gray-300 leading-7 mb-4">{{ paragraph }}</p> }
          @if (section.items) { <ul class="space-y-2 text-gray-600 dark:text-gray-300 list-disc pl-5">@for (item of section.items; track item) { <li>{{ item }}</li> }</ul> }
        </section>
      }
      <a routerLink="/contact" class="btn-outline">Contact support</a>
    </main>`
})
export class InformationPageComponent {
  private route = inject(ActivatedRoute);
  page = computed(() => PAGES[this.route.snapshot.data['page']] ?? PAGES['help-center']);
}
