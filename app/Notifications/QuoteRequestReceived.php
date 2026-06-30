<?php

namespace App\Notifications;

use App\Models\Quote;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class QuoteRequestReceived extends Notification
{
    use Queueable;

    public function __construct(private readonly Quote $quote)
    {
        $this->quote->loadMissing('product');
    }

    /**
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['mail'];
    }

    public function toMail(object $notifiable): MailMessage
    {
        $mail = (new MailMessage)
            ->subject('Quote Request - KH Equipment Hub Website')
            ->greeting('Quote Request')
            ->line('A customer requested a quote from KH Equipment Hub.')
            ->line('Customer Name: '.$this->quote->name)
            ->line('Customer Email: '.$this->quote->email)
            ->line('Phone Number: '.$this->quote->phone)
            ->line('Product Name: '.$this->quote->product_name_snapshot)
            ->line('Company: '.($this->quote->company ?: 'Not provided'))
            ->line('Address: '.$this->quote->address)
            ->line('Country: '.$this->quote->country);

        if ($this->quote->product?->description) {
            $mail->line('Product Description: '.$this->quote->product->description);
        }

        if ($this->quote->message) {
            $mail->line('Message: '.$this->quote->message);
        }

        return $mail;
    }
}
