import { Shell } from '@/components/shell';

export default function Agreement() {
  return (
    <Shell>
      <div className="flex w-full max-w-screen-lg flex-col items-start justify-center gap-8">
        <h1 className="text-4xl font-bold text-gray-900">Agreement</h1>

        <section className="w-full space-y-6">
          <div>
            <h2 className="mb-4 text-2xl font-semibold text-gray-800">
              Purpose of this Agreement
            </h2>
            <p className="leading-relaxed text-gray-700">
              This Client Agreement (&ldquo;Agreement&rdquo;) sets out the terms on which H&W
              Investments Limited (&ldquo;H&W&rdquo;, &ldquo;the Firm&rdquo;, &ldquo;we&rdquo;,
              &ldquo;us&rdquo;) will provide investment services to you (&ldquo;the
              Client&rdquo;, &ldquo;you&rdquo;). It is designed to comply with the requirements
              of the FCA&apos;s Conduct of Business Sourcebook (COBS) and the Markets in
              Financial Instruments Directive (MiFID II). It should be read in conjunction with
              the Terms of Use for the realXmarket application and our Data Privacy Policy. By
              signing this Agreement, you confirm that you have read, understood, and accepted
              its terms.
            </p>
          </div>

          <div>
            <h2 className="mb-4 text-2xl font-semibold text-gray-800">
              Our Regulatory Status
            </h2>
            <p className="leading-relaxed text-gray-700">
              H&W is authorised and regulated by the Financial Conduct Authority (FCA) and is
              permitted to carry on investment business. The FCA&apos;s address is 12 Endeavour
              Square, London, E20 1JN.
            </p>
          </div>

          <div>
            <h2 className="mb-4 text-2xl font-semibold text-gray-800">
              Client Classification
            </h2>
            <p className="mb-3 leading-relaxed text-gray-700">
              We are required to classify clients as either a Retail Client, Professional
              Client, or Eligible Counterparty under FCA rules. Unless otherwise notified, you
              will be treated as a Retail Client, which provides you with the highest level of
              regulatory protection.
            </p>
            <p className="leading-relaxed text-gray-700">
              You have the right to request a different classification, but this may result in
              reduced regulatory protections.
            </p>
          </div>

          <div>
            <h2 className="mb-4 text-2xl font-semibold text-gray-800">Services We Provide</h2>
            <p className="mb-3 leading-relaxed text-gray-700">
              We provide the following service:
            </p>
            <ul className="ml-4 list-inside list-disc space-y-2 text-gray-700">
              <li>
                <strong>Investment intermediation:</strong> arranging deals in investments by
                making available to you the realXmarket application for the investment into
                tokenised real estate.
              </li>
            </ul>
            <p className="mt-3 leading-relaxed text-gray-700">
              We do not provide investment advice or discretionary portfolio management
              services and are not authorised to do so.
            </p>
          </div>

          <div>
            <h2 className="mb-4 text-2xl font-semibold text-gray-800">
              Your Responsibilities
            </h2>
            <p className="mb-3 leading-relaxed text-gray-700">You agree to:</p>
            <ul className="ml-4 list-inside list-disc space-y-2 text-gray-700">
              <li>
                Provide complete and accurate information as part of the onboarding process
              </li>
              <li>
                Keep us up to date regarding any change of personal details (a change of name
                or address, for instance) during the course of your relationship with us
              </li>
              <li>
                Seek independent financial advice if you are unsure about whether or not to
                invest via the realXmarket application
              </li>
            </ul>
          </div>

          <div>
            <h2 className="mb-4 text-2xl font-semibold text-gray-800">Charges and Costs</h2>
            <p className="mb-3 leading-relaxed text-gray-700">
              As at the date of this client agreement, the only fees we will currently charge
              you are a 1% transaction fee on each and any of:
            </p>
            <ul className="ml-4 list-inside list-disc space-y-2 text-gray-700">
              <li>
                The purchase price you pay for a property token in a property listed on the
                realXmarket application
              </li>
              <li>
                The purchase price you pay or sale price you receive for a property token via
                the realXmarket application secondary marketplace noticeboard
              </li>
            </ul>
            <p className="mt-3 leading-relaxed text-gray-700">
              Should our fees change in any way, we give you at least 30 days notice of that
              change by email and by notification within the app.
            </p>
          </div>

          <div>
            <h2 className="mb-4 text-2xl font-semibold text-gray-800">
              Conflicts of Interest
            </h2>
            <p className="mb-3 leading-relaxed text-gray-700">
              We maintain a Conflicts of Interest Policy and Register to help us identify and
              manage any conflicts that may arise that could impact on our ability to deliver
              services to you in an impartial manner. A copy is available on request.
            </p>
            <p className="leading-relaxed text-gray-700">
              Where we cannot manage a conflict of interest to such an extent that we are
              satisfied it will not impact on you, we will disclose it to you before
              proceeding.
            </p>
          </div>

          <div>
            <h2 className="mb-4 text-2xl font-semibold text-gray-800">
              Safeguarding of Assets
            </h2>
            <p className="leading-relaxed text-gray-700">
              We do not hold client money or custody assets.
            </p>
          </div>

          <div>
            <h2 className="mb-4 text-2xl font-semibold text-gray-800">Communications</h2>
            <p className="mb-3 leading-relaxed text-gray-700">
              We will typically communicate with you in English, in writing, electronically, or
              by telephone. If you need us to communicate with you in a different language,
              please let us know and we will do our best to accommodate your request.
            </p>
            <p className="leading-relaxed text-gray-700">
              Records of our communications, including telephone conversations, may be retained
              as required by law.
            </p>
          </div>

          <div>
            <h2 className="mb-4 text-2xl font-semibold text-gray-800">Complaints</h2>
            <p className="mb-3 leading-relaxed text-gray-700">
              If you are dissatisfied with our services, you should contact us in the first
              instance. You can do so:
            </p>
            <ul className="ml-4 list-inside list-disc space-y-2 text-gray-700">
              <li>In writing via email</li>
              <li>By raising a support request via the realXmarket application</li>
              <li>By telephone at INSERT NUMBER</li>
            </ul>
            <p className="mt-3 leading-relaxed text-gray-700">
              We will never request you to put a complaint in writing but you may choose to do
              so. A copy of our full complaints procedure is available on request.
            </p>
            <p className="mt-3 leading-relaxed text-gray-700">
              Depending on the nature of your complaint, you may be able to escalate it to the
              Financial Ombudsman Service if you are not happy with the way we have dealt with
              it. We will provide you with their contact details when responding to your
              complaint and also inform you whether your complaint is likely to fall within
              their remit.
            </p>
          </div>

          <div>
            <h2 className="mb-4 text-2xl font-semibold text-gray-800">Compensation</h2>
            <p className="leading-relaxed text-gray-700">
              We are covered by the Financial Services Compensation Scheme (FSCS). You may be
              entitled to compensation if we are unable to meet our obligations. Limits and
              eligibility conditions apply. More information is available on our website.
            </p>
          </div>

          <div>
            <h2 className="mb-4 text-2xl font-semibold text-gray-800">Data Protection</h2>
            <p className="leading-relaxed text-gray-700">
              We process your personal data in accordance with UK GDPR and the Data Protection
              Act 2018. Our Privacy Policy explains how we collect, use, and store your
              information.
            </p>
          </div>

          <div>
            <h2 className="mb-4 text-2xl font-semibold text-gray-800">Termination</h2>
            <p className="leading-relaxed text-gray-700">
              Either party may terminate this Agreement by giving written notice at any time.
              Termination does not affect accrued rights or obligations, including payment of
              fees.
            </p>
          </div>

          <div>
            <h2 className="mb-4 text-2xl font-semibold text-gray-800">Governing Law</h2>
            <p className="leading-relaxed text-gray-700">
              This Agreement is governed by and construed in accordance with the laws of
              England and Wales, and any disputes will be subject to the exclusive jurisdiction
              of the English courts.
            </p>
          </div>

          {/* <div className="mt-8 rounded-lg bg-gray-50 p-4">
            <p className="text-sm text-gray-600">
              <strong>Regional Operator:</strong> H&W Investments Ltd
            </p>
          </div> */}
        </section>
      </div>
    </Shell>
  );
}
