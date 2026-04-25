import React, { useState } from 'react';
import { Heart, Copy, ExternalLink, ArrowLeft, Check } from 'lucide-react';
import toast from 'react-hot-toast';
import { Button } from '../ui';
import './DonatePage.css';

const METHODS = [
  {
    id: 'github',
    label: 'GitHub Sponsors',
    description: 'Recurring or one-time — directly through GitHub.',
    url: 'https://github.com/sponsors/omnivoice-studio',
    icon: '🐙',
    type: 'link',
  },
  {
    id: 'paypal',
    label: 'PayPal',
    description: 'One-time or recurring via PayPal.',
    url: 'https://paypal.me/omnivoicestudio',
    icon: '💳',
    type: 'link',
  },
  {
    id: 'kofi',
    label: 'Ko-fi',
    description: 'Buy the team a coffee. No account needed.',
    url: 'https://ko-fi.com/omnivoicestudio',
    icon: '☕',
    type: 'link',
  },
  {
    id: 'patreon',
    label: 'Patreon',
    description: 'Monthly support with early access perks.',
    url: 'https://patreon.com/omnivoicestudio',
    icon: '🎨',
    type: 'link',
  },
  {
    id: 'btc',
    label: 'Bitcoin',
    description: 'Native BTC — any amount.',
    address: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh',
    icon: '₿',
    type: 'crypto',
    network: 'Bitcoin (BTC)',
  },
  {
    id: 'eth',
    label: 'Ethereum',
    description: 'ETH or ERC-20 tokens.',
    address: '0x71C7656EC7ab88b098defB751B7401B5f6d8976F',
    icon: 'Ξ',
    type: 'crypto',
    network: 'Ethereum (ETH / ERC-20)',
  },
  {
    id: 'usdt',
    label: 'USDT (Tron)',
    description: 'USDT on the TRC-20 network.',
    address: 'TN2f6GdQwJGbMGbeeFqkwYX4SSpVcGe94v',
    icon: '💲',
    type: 'crypto',
    network: 'Tron (TRC-20)',
  },
  {
    id: 'sol',
    label: 'Solana',
    description: 'SOL or SPL tokens.',
    address: '7EcDhSYGxXyscszYEp35KHN8vvw3svAuLKTzXwCFLtV',
    icon: '◎',
    type: 'crypto',
    network: 'Solana (SOL)',
  },
];

function CryptoCard({ method }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(method.address);
      setCopied(true);
      toast.success(`${method.label} address copied`);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error('Copy failed');
    }
  };
  return (
    <div className="donate-card">
      <div className="donate-card__icon">{method.icon}</div>
      <div className="donate-card__body">
        <div className="donate-card__title">{method.label}</div>
        <div className="donate-card__desc">{method.description}</div>
        <div className="donate-card__address-row">
          <code className="donate-card__address">{method.address}</code>
          <button
            className="donate-card__copy"
            onClick={handleCopy}
            title="Copy address"
          >
            {copied ? <Check size={12} /> : <Copy size={12} />}
          </button>
        </div>
        <span className="donate-card__network">{method.network}</span>
      </div>
    </div>
  );
}

function LinkCard({ method }) {
  return (
    <div className="donate-card donate-card--link">
      <div className="donate-card__icon">{method.icon}</div>
      <div className="donate-card__body">
        <div className="donate-card__title">{method.label}</div>
        <div className="donate-card__desc">{method.description}</div>
      </div>
      <button
        className="donate-card__go"
        onClick={() => window.open(method.url, '_blank')}
        title={`Open ${method.label}`}
      >
        <ExternalLink size={14} />
      </button>
    </div>
  );
}

export default function DonatePage({ onBack }) {
  const links = METHODS.filter(m => m.type === 'link');
  const crypto = METHODS.filter(m => m.type === 'crypto');

  return (
    <div className="donate-page">
      <div className="donate-page__header">
        <Button variant="ghost" size="sm" onClick={onBack} leading={<ArrowLeft size={14} />}>
          Back
        </Button>
      </div>
      <div className="donate-page__content">
        <div className="donate-page__hero">
          <Heart size={32} className="donate-page__heart" />
          <h2>Support OmniVoice Studio</h2>
          <p>
            OmniVoice Studio is free, open-source, and runs entirely on your machine.
            If it saves you time or money, consider supporting continued development.
          </p>
        </div>

        <div className="donate-page__sections">
          <section className="donate-section">
            <h3>Platforms</h3>
            <div className="donate-grid">
              {links.map(m => <LinkCard key={m.id} method={m} />)}
            </div>
          </section>

          <section className="donate-section">
            <h3>Cryptocurrency</h3>
            <div className="donate-grid">
              {crypto.map(m => <CryptoCard key={m.id} method={m} />)}
            </div>
          </section>
        </div>

        <p className="donate-page__footer">
          Every contribution — no matter the size — helps keep this project alive.
          Thank you. ♥
        </p>
      </div>
    </div>
  );
}
