import { Shell } from '@/components/shell';

export default function RiskWarning() {
  return (
    <Shell>
      <div className={'flex w-full max-w-screen-lg flex-col items-start justify-center gap-6'}>
        <h1 className=" text-3xl font-bold">Risk warning</h1>
        <p>
          Do not invest unless you are prepared to lose all the money you invest. This is a
          high-risk investment and you are unlikely to be protected if something goes wrong.
        </p>

        <p>
          Learn more about the risks connected to investing in cryptoassets. <br /> <br />
          Investing in cryptoassets comes with a unique set of risks and challenges that
          everyone who invests in crypto should be aware of. The nature of and uncertainty
          around these risks mean that cryptoasset investments can suffer extreme price swings,
          and even drop down to zero in some cases. <br /> <br />
          For this reason, the UK’s FCA suggests that no more than 10% of your assets should be
          allocated to high-risk investments like crypto.
        </p>

        <p>
          <strong>Extreme market & price volatility</strong> <br /> Cryptoassets are notorious
          for wild swings in price – both up AND down – within short periods of time. This may
          lead to potentially significant gains – or equally brutal losses. Amongst many other
          things, here are just a few reasons for this volatility. <br /> <br /> The relatively
          small trading volumes (when compared to traditional markets like stocks and bonds).{' '}
          <br /> <br /> markets like stocks and bonds). A global, 24/7 market dynamic means
          that crypto markets are highly susceptible to contagion and massive crashes. <br />{' '}
          <br />
          Concentration of assets in the hands of few players who can move the market
          significantly or commit fraud.
          <br /> <br /> Sudden abandonment, failure, or lack of interest around a cryptoasset
          may mean there aren’t any buyers in the market, and investors are stuck with a
          worthless asset.
        </p>

        <p>
          <strong>Immature technology</strong> <br /> Blockchain and other decentralised
          technologies that underlay cryptoassets are still relatively recent when compared to
          more mature financial infrastructure. The cutting-edge nature of the technology comes
          with inherent risks, such as: <br /> <br /> Open-source development around a specific
          project may be abandoned or reach a dead end. <br /> <br />
          Bugs can be found that compromise applications, functionality, or funds. <br />{' '}
          <br />
          Contentious upgrades may fragment and break apart the communities that underlie a
          project.
        </p>

        <p>
          <strong>Custodial and usability risks</strong> <br />
          Hosting and transacting safely with cryptoassets is still difficult for most everyday
          users. Here are just a few risks: <br /> <br />
          Self-hosting, where the user is responsible for keeping their assets safe, can be
          risky for many, as losing a wallet’s private keys means the assets are lost. <br />{' '}
          <br />
          Third-party hosting, where users of a wallet have the same login and password
          recovery as most web2 platforms, carries the risk of counterparty failure, hacks, or
          outright fraud – since the third party is actually the controller of the deposited
          cryptoassets. <br /> <br />
          Transfers are usually irreversible, so if a user enters the wrong receiving address,
          there’s no recovering it.
        </p>

        <p>
          <strong>Cyber threats</strong> <br /> The crypto space is particularly susceptible to
          cyber threats, hacks, and the exploit of tech/organisational vulnerabilities in
          crypto exchanges, decentralised platforms, and wallets.
        </p>

        <p>
          <strong>Regulatory uncertainty</strong> <br />
          The fast-moving and globally fragmented regulatory landscape can be a risk for
          investors. For example, residents of a country could wake up one day to find that
          their country has made cryptoassets illegal.
        </p>

        <p>
          <strong> Fraud and financial crime</strong> <br />
          The global nature of crypto, plus the inconsistent and fragmented regulatory
          landscape make crypto a particularly fertile ground for fraudsters and criminals.
          <br /> <br />
          The lack of regulations usually means that cryptoassets fall outside traditional
          financial protection recourse; for example, in the UK, the FCSC doesn’t apply to
          crypto, and investors can’t file a complaint with the Financial Ombudsman <br />
          <br />
          Criminals can easily commit crimes against citizens of different countries, making
          cross border legal action or any kind of enforcement very difficult. <br /> <br />
          Investment into real estate via the Xcavate realXmarket platform involves the
          purchase of property tokens, each of which represents a share in a Limited Liability
          Partnership (LLP) known as a “Special Purpose Vehicle”. Because the shares of this
          LLP aren’t listed or traded on a stock exchange, they can be subject to significant
          changes in value and you could lose some or even all of your money. Further, they
          aren’t as “liquid” as some other types of investment. This means that you might not
          be able to sell your investment quickly or at all, so you shouldn&apos;t proceed if
          it is possible you will need quick access to the funds you have invested.
        </p>
      </div>
    </Shell>
  );
}
