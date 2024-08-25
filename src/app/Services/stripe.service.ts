// src/app/services/stripe.service.ts
import { Injectable } from '@angular/core';
import { loadStripe, Stripe } from '@stripe/stripe-js';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class StripeService {
  private stripe: Stripe | null = null;

  constructor(private http: HttpClient) {}

  async init() {
    this.stripe = await loadStripe(
      'pk_test_51PoWjlG63yy5fRrkIeVefe6uAFjzUZ7n71C3TSrwWmGEjp79bWlOm8z62eiQCBP83CiM3jhfr3VgDlcuYbCRk5nj00tRXbd1il'
    );
  }

  createPaymentIntent(amount: number, currency: string) {
    return this.http.post('/create-payment', { amount, currency });
  }

  async confirmPayment(clientSecret: string, cardElement: any) {
    if (!this.stripe) {
      throw new Error('Stripe is not initialized');
    }

    const { paymentIntent, error } = await this.stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card: cardElement,
        },
      }
    );

    if (error) {
      throw error;
    }

    return paymentIntent;
  }
}
