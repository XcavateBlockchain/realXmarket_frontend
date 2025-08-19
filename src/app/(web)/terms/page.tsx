import { Shell } from '@/components/shell';

export default function Terms() {
  // Function to format date as "19th, Aug 2025"
  const getCurrentDate = () => {
    const now = new Date();
    const day = now.getDate();
    const month = now.toLocaleDateString('en-US', { month: 'short' });
    const year = now.getFullYear();

    // Add ordinal suffix to day
    const getOrdinalSuffix = (day: number) => {
      if (day > 3 && day < 21) return 'th';
      switch (day % 10) {
        case 1:
          return 'st';
        case 2:
          return 'nd';
        case 3:
          return 'rd';
        default:
          return 'th';
      }
    };

    return `${day}${getOrdinalSuffix(day)}, ${month} ${year}`;
  };

  return (
    <Shell>
      <div className={'flex w-full max-w-screen-lg flex-col items-start justify-center gap-6'}>
        <h1 className=" text-3xl font-bold">Terms of use</h1>
        <strong>Effective date: {getCurrentDate()}</strong>

        <p>
          <strong>IMPORTANT</strong>: By accessing or using any of the Xcavate Services (as
          defined below), you (“you”, “your”, “User”) acknowledge that you have read,
          understand, and completely agree to these Terms (as updated and amended from time to
          time, the “Terms”). If you do not agree to be bound by these Terms or with any
          subsequent amendments, changes or updates, you may not access or use any of the
          Xcavate Services, and if you do access or use any of the Xcavate Services, you will
          be bound by these Terms, as updated and amended from time to time. Your only recourse
          in the case of your unwillingness to continue to be bound by these Terms is to stop
          using all of the Xcavate Services. These Terms apply to all users and others who
          access the Xcavate Services (“Users”). Only Eligible Users (as defined below) are
          permitted to purchase, access or use the Xcavate Services. Any Person that is not an
          Eligible User that utilises the Xcavate Services will be in breach of these Terms.
        </p>

        <div className="space-y-2">
          <strong>1. INTRODUCTION</strong>
          <p>
            If you have any doubt over the meaning of these terms, please contact us at [ ]
            before you use any Xcavate Services. Any decision to utilise the Xcavate Services
            should be based on consideration of these Terms as a whole.
          </p>
          <ul className="ml-6 list-decimal space-y-1">
            <li>
              These Terms constitute the entire agreement and understanding with respect to the
              access or use of any or all of the Xcavate Services between you and H&W
              Investments Ltd. (hereafter “Xcavate”), a company with limited liability
              incorporated in the United Kingdom, or any successor operator of the Xcavate
              Services (together with any successors or assigns, “Xcavate”, “we”, “our”) (each
              of you and Xcavate being a “Party” and collectively the “Parties”).
            </li>
            <li>
              These Terms may be amended, changed, or updated by Xcavate at any time and
              without prior notice to you. You should check back often to confirm that your
              copy and understanding of these Terms is current and correct. Your
              non-termination or continued access or use of any Xcavate Services after the
              effective date of any amendments, changes, or updates constitutes your acceptance
              of these Terms, as modified by such amendments, changes, or updates. Your only
              recourse in the case of your unwillingness to continue to be bound by these Terms
              is to stop using all of the Xcavate Services.
            </li>
            <li>
              he use of the Xcavate Services is void where such access or use is prohibited by,
              would constitute a violation of, or would be subject to penalties under
              applicable Laws, and shall not be the basis for the assertion or recognition of
              any interest, right, remedy, power, or privilege.
            </li>
          </ul>
        </div>

        <div className="space-y-2">
          <strong>2. DEFINITIONS</strong>
          <ul className="ml-8 list-decimal space-y-1">
            <li>
              In these Terms, the following words have the following meanings, unless otherwise
              indicated:
              <p>
                ”AML” means anti-money laundering, including all Laws prohibiting money
                laundering or any acts or attempted acts to conceal or disguise the identity or
                origin of; change the form of; or move, transfer, route or transport, illicit
                proceeds, property, assets, funds, fiat, or Digital Assets, including the
                promotion of any unlawful activity such as fraud, tax evasion, embezzlement,
                insider trading, financial crime, bribery, cyber theft or hack, narcotics
                trafficking, weapons proliferation, terrorism, or Economic Sanctions
                violations, which may also require internal controls to detect, prevent,
                report, and maintain records of suspected money laundering or terrorist
                financing;
              </p>
              <p>
                “Anti-Corruption Laws” means all applicable Laws prohibiting corruption or
                bribery of Government Officials, kickbacks, inducements, and other related
                forms of commercial corruption or bribery;
              </p>
              <p>
                related forms of commercial corruption or bribery; “CTF” means
                counter-terrorist financing; “Economic Sanctions” means financial sanctions,
                trade embargoes, export or import controls, anti-boycott, and restrictive trade
                measures enacted, administered, enforced, or penalized by any Laws; “Eligible
                User” means Users of the Xcavate Services where: (i) they are not Prohibited
                Persons; and (ii) they do not utilise the Xcavate Services to facilitate any
                Prohibited Uses; “Government” means any national, federal, state, municipal,
                local, or foreign branch of government, including any department, agency,
                subdivision, bureau, commission, court, tribunal, arbitral body, or other
                governmental, government appointed, or quasi-governmental authority or
                component exercising executive, legislative, juridical, regulatory, or
                administrative powers, authority, or functions of or pertaining to a government
                instrumentality, including any parasternal company, or state-owned (majority or
                greater) or controlled business enterprise; “Government Approval” means any
                authorization, license, permit, consent, approval, franchise, concession,
                lease, ruling, certification, exemption, exception, filing or waiver by or with
                any Government necessary to conduct the business of either Party or the
                execution, delivery and performance of the Xcavate Services; “Government
                Official” means an officer or employee of any Government, a director, officer,
                or employee of any instrumentality of any Government, a candidate for public
                office, a political party or political party official, an officer or employee
                of a public international organization, and any Person who is acting in an
                official capacity for any of the foregoing, even if such Person is acting in
                that capacity temporarily and without compensation; “Law” means all laws,
                statutes, orders, regulations, rules, treaties, and/or official obligations or
                requirements enacted, promulgated, issued, ratified, enforced, or administered
                by any Government that apply to you, Xcavate or the Xcavate Services; “Losses”
                means, collectively, any claim, application, loss, injury, delay, accident,
                cost, business interruption costs, or any other expenses (including attorneys’
                fees or the costs of any claim or suit), including any incidental, direct,
                indirect, general, special, punitive, exemplary, or consequential damages, loss
                of goodwill or business profits, work stoppage, data loss, computer failure or
                malfunction, or any and all other commercial losses; “Person” includes an
                individual, association, partnership, corporation, company, other body
                corporate, trust, estate, and any form of organization, group, or entity
                (whether or not having separate legal personality); “Prohibited Jurisdiction”
                means any jurisdiction subject to a comprehensive embargo by the United Kingdom
                or the United Nations including Governmental Authorities of those
                jurisdictions; “Prohibited Person” means any resident of, Government or
                Government Official of, any Prohibited Jurisdiction; and any Sanctioned Person;
                “Prohibited Use” has the meaning given to it in Section 5; “Sanctions List”
                means any foreign terrorist organization or other sanctioned, restricted, or
                debarred party list published under the Laws of the United Kingdom or the
                United Nations; “Sanctioned Person” refers to any Person or Digital Assets
                network address that is: (i) specifically listed in any Sanctions List; (ii)
                directly or indirectly owned 50 percent or more by any Person or group of
                Persons in the aggregate or Digital Assets network address associated with such
                Person or Persons that is included in any Sanctions List, (iii) the Government
                or any Government Official of any Prohibited Jurisdiction; or (v) whose
                dealings with Xcavate, and/or the User is subject to any Government Approval or
                otherwise sanctioned, restricted, or penalized under applicable Economic
                Sanctions, AML, or CTF Laws; “Tax Information Exchange Laws” means Laws
                relating to the exchange of information relating to taxes between Governments;
                “Third Party Services” means any website, node, programming interface, product,
                data or service that is not controlled by Xcavate; “Xcavate Services” means the
                services provided by Xcavate through the [site] [any apps?];
              </p>
            </li>
            <li>
              Unless otherwise specified in these Terms, words importing the singular include
              the plural and vice versa and words importing gender include all genders. The
              word “include”, “includes” or “including” will be interpreted on an inclusive
              basis and be deemed to be followed by the words “without limitation”.
            </li>
          </ul>
        </div>

        <div>
          <strong>3. XCAVATE SERVICES</strong>
          <ul className="ml-8 list-decimal space-y-1">
            <li>
              You may use the Xcavate Services solely in accordance with these Terms. You shall
              not take any steps to circumvent, avoid, bypass or obviate, directly or
              indirectly, the intent of these Terms.
            </li>
            <li>
              We may, without prior notice, change the Xcavate Services; stop providing any of
              the Xcavate Services or features of the Xcavate Services, to you or to Users
              generally; or create usage limits for the Xcavate Services. Some Xcavate Services
              may not be available to you. We may permanently or temporarily terminate or
              suspend your access to the Xcavate Services without notice and liability for any
              reason, including: (i) your violation of these Terms; (ii) if Xcavate determines
              or suspects that you have ceased to be an Eligible User; (iii) scheduled or
              unscheduled maintenance; (iv) addressing any emergency security concerns or other
              force majeure event or (v) for no reason. Upon termination for any reason or no
              reason, you continue to be bound by these Terms.
            </li>
          </ul>
        </div>

        <div>
          <strong> THIRD PARTY SERVICES</strong>

          <ul className="ml-8 list-decimal space-y-1">
            <li>
              The Xcavate Services utilize and provide access to or link to Third Party
              Services, including by enabling you to access such Third Party Services through
              [specify sites and apps]. We do not have control over Third Party Services
              content, do not warrant or endorse, and are not responsible for the availability
              or legitimacy of, the content, products, assets, or services on or accessible
              from those Third Party Services (including any related websites, resources or
              links displayed therein). Third Party Services may expose you to risks. You are
              responsible for identifying and evaluating risks associated with Third Party
              Services and you should not use any Third Party Services if your evaluation of
              the risks indicates the Third Party Services are not appropriate for you.
            </li>
            <li>
              You may incur charges from third parties for use of Third Party Services. For
              example, you may be charged fees for Third Party Services that you may access via
              the Xcavate Site. Third Party Services fees are not charged by Xcavate and are
              not paid to Xcavate. Any fees charged by Xcavate will be designated as such and
              presented before you submit your transaction.
            </li>
            <li>
              WE MAKE NO WARRANTIES OR REPRESENTATIONS, EXPRESS OR IMPLIED, ABOUT LINKED THIRD
              PARTY SERVICES, THE THIRD PARTIES THEY ARE OWNED AND OPERATED BY, THE INFORMATION
              CONTAINED ON THEM, ASSETS AVAILABLE THROUGH THEM, OR THE SUITABILITY, PRIVACY, OR
              SECURITY OF THEIR PRODUCTS OR SERVICES. YOU ACKNOWLEDGE SOLE RESPONSIBILITY FOR
              AND ASSUME ALL RISK ARISING FROM YOUR USE OF THIRD-PARTY SERVICES, THIRD-PARTY
              WEBSITES, APPLICATIONS, OR RESOURCES. IN NO EVENT WILL XCAVATE BE LIABLE FOR ANY
              DAMAGES ARISING OUT OF OR RELATING TO THIRD PARTY SERVICES. THIS SECTION OPERATES
              IN ADDITION TO ANY LIMITATION OF LIABILITY EXPRESSED ELSEWHERE IN THIS USER
              AGREEMENT.
            </li>
          </ul>
        </div>

        <div>
          <strong>PROHIBITED USES</strong>
          <p>
            You agree not to engage in any of the following prohibited activities: (i) copying
            or distributing, any of the Xcavate Services in any medium; (ii) attempting to
            interfere with, compromise the system integrity or security or decipher any
            transmissions to or from the servers running the Xcavate Services; (iii) uploading
            invalid data, viruses, worms, or other software agents through the Xcavate
            Services; (iv) collecting or harvesting any personally identifiable information,
            including account names, from the Xcavate Services; (v) using the Xcavate Services
            for any commercial solicitation purposes; (vi) interfering with the proper working
            of the Xcavate Services; (vii) accessing any content on the Xcavate Services
            through any technology or means other than those provided or authorized by the
            Xcavate Services; or (viii) bypassing the measures we may use to prevent or
            restrict access to th Xcavate Services, including without limitation features that
            prevent or restrict use or copying of any content or enforce limitations on use of
            the Xcavate Services or the content therein. 2. Further, you must not: a. use any
            Xcavate Services if any applicable Laws, including AML Laws, CTF Laws,
            Anti-Corruption Laws and Economic Sanctions Laws, prohibit, penalize, sanction, or
            expose Xcavate to liability for any Xcavate Services furnished or offered to you;
            b. use any Xcavate Services to facilitate, approve, evade, avoid, or circumvent any
            applicable Laws, including AML Laws, CTF Laws, Anti-Corruption Laws, and Economic
            Sanctions Laws; c. use the Xcavate Services to impersonate another Person or
            misrepresent your affiliation with any Person, conduct fraud, or hide or attempting
            to hide your identity; d. falsify or materially omit any information or provide
            misleading or inaccurate information requested by Xcavate, including prior to or
            during the course of our providing an Xcavate Services to you; e. cause injury to,
            or attempt to harm or otherwise engage in conduct that is detrimental to Xcavate,
            or any Person through your access to the Xcavate Services; f. subvert any
            restrictions set out herein; g. use any of the Xcavate Services utilizing any
            virtual private network, proxy service, or any other third-party service, network,
            or product with the effect of disguising your IP address or location;; or h.
            violate, promote, cause a violation of, or conspire or attempt to violate these
            Terms or applicable Laws. Any use as described in this Section 5 shall constitute a
            “Prohibited Use”. If Xcavate determines or suspects that you have engaged in any
            Prohibited Use, Xcavate may address such Prohibited Use through an appropriate
            sanction, in its sole and absolute discretion. Such sanction may include suspending
            or terminating your access to any Xcavate Services. In addition, should your
            actions or inaction result in Loss being suffered by Xcavate you shall pay an
            amount to Xcavate so as to render Xcavate whole.
          </p>
        </div>
        <div>
          <strong>6. INFORMATION OBLIGATIONS</strong>
          <p>
            Xcavate may, from time to time, request information regarding your use of any
            Xcavate Service. All information provided to Xcavate must be true, accurate and not
            misleading in all respects. In the event that there are any changes to any
            information provided to Xcavate, you must inform Xcavate of such changes in writing
            through [ ] prior to such changes taking effect. Xcavate reserves the right to
            cease to allow you to access the Xcavate Services at any time, including as a
            result of any change in information provided or a failure to provide any
            information when requested.
          </p>
        </div>

        <div>
          <strong>7. PRIVACY</strong>
          <p>
            information and data that you provide to us when using the Xcavate Services. You
            acknowledge and agree that you have carefully read and understand the Xcavate
            Privacy Notice.
          </p>
        </div>

        <div>
          <p>
            8. YOUR REPRESENTATIONS, WARRANTIES AND COVENANTS You represent and warrant to
            Xcavate on the date of your acceptance or deemed acceptance of these Terms and each
            day on which you utilize or access the XcavateServices, in each case with reference
            to the facts and circumstances existing at such date, as follows: 1. none of you or
            any of your respective affiliates is: (i) itself or owned (beneficially or of
            record) or controlled by one or more Prohibited Person(s); (ii) involved in any
            transaction or conduct that is likely to result in you or your respective
            affiliates or your or their shareholders, directors, officers, employees, agents,
            or partners becoming a Prohibited Person; (iii) residing or domiciled in, or
            utilising the Xcavate Services from a Prohibited Jurisdiction; (iv) a Government or
            Government Official of a Prohibited Jurisdiction or (v) otherwise a Prohibited
            Person; 2. none of you or any of your respective affiliates is involved in activity
            or conduct, including conduct involving Xcavate could result in any of you becoming
            a Prohibited Person; 3. none of you or any of your respective affiliates is
            otherwise prohibited by applicable Laws from using the services provided by Xcavate
            and your use of the Xcavate Services will not contravene any Law applicable to you;
            4. the Xcavate Services will not be used by any of you or any of your respective
            affiliates to enable any Prohibited Uses; 5. all information provided by or on your
            behalf to Xcavate is true, complete and not misleading and does not omit any fact
            that Xacavate may deem to be material in considering whether to provide the Xcavate
            Services to you; 6. if you are a natural person, you are 18 years of age or older
            and that you have the capacity to contract under applicable Laws; 7. if you are
            registering to use or using the Xcavate Services on behalf of a legal entity, (i)
            such legal entity is duly organized and validly existing under the applicable Laws
            of the jurisdiction of its organization; and (ii) you, and any individuals
            utilizing the services on behalf of the legal entity are duly authorized by such
            legal entity to act on its behalf; 8. you have had the opportunity to seek legal,
            accounting, taxation and other professional advice regarding these Terms and the
            Xcavate Services; 9. you and your respective affiliates are currently in compliance
            with, and will, at your own cost and expense, comply with all Laws that relate to
            or affect the Xcavate Services to be provided, including AML Laws, CTF Laws,
            Anti-Corruption Laws, Economic Sanctions Laws, Tax Information Exchange Laws or
            other Laws; 10. none of yo or your respective affiliates have (i) violated; (ii)
            been fined, debarred, sanctioned, the subject of Economic Sanctions-related
            restrictions, or otherwise penalized under; (iii) received any oral or written
            notice from any Government concerning actual or possible violation by you under; or
            (iv) received any other report that you are the subject or target of sanctions,
            restrictions, penalties, or enforcement action or investigation under, any
            applicable Laws, including AML Laws, CTF Laws, Anti-Corruption Laws, or Economic
            Sanctions Laws; 11. none of you or your respective affiliates and your respective
            shareholders, directors, officers, employees, agents, or partners has directly or
            indirectly offered, promised, given, or authorized any payment, or offered,
            promised, given, or authorized the giving of anything else of value to a Government
            Official or individual employed by another entity in the private sector in
            violation of any applicable Anti-Corruption Laws; 12. you consent to any and all
            information reporting under applicable Laws as Xcavate may determine in its sole
            discretion; and 13. you will accurately and promptly inform Xcavate if you know or
            have reason to know whether any of the foregoing representations or warranties no
            longer is correct or becomes incorrect. 9. NO REPRESENTATION BY XCAVATE 1. Xcavate
            makes no representations, warranties, covenants or guarantees to you of any kind
            and, to the extent permitted by applicable Laws, Xcavate expressly disclaims all
            representations, warranties, covenants or guarantees, express, implied or
            statutory, with respect to the Xcavate Services. The Xcavate Services are offered
            without any representation as to fitness for any particular purpose. 2. Without
            limiting the generality of Section 9.1, Xcavate makes no representations,
            warranties, covenants or guarantees to you in respect of any Third Party Service.
            10. NO REGULATORY LICENSE OR INSURANCE Xcavate is not authorised or regulated by
            the Financial Conduct Authority in the United Kingdom and is not subject to
            regulatory oversight elsewhere. Whilst Xcavate has been accepted to the Financial
            Conduct Authority’s regulatory sandbox such admittance does not entitle you to any
            of the protections associated with conducting business with a firm authorised by
            the Financial Conduct Authority, including the Financial Ombudsman Service or, in
            the event of our insolvency, the Financial Services Compensation Scheme. Whilst
            Xcavate may maintain insurance for its own benefit in connection with its business,
            the insurance, if maintained, is solely for the benefit of Xcavate and does not
            guarantee or insure any User in any way. 11. RESPONSIBILITIES, LIMITATION OF
            LIABILITY AND INDEMNITY 1. To the maximum extent permitted by applicable Law, you
            irrevocably agree and acknowledge that Xcavate does not assume any liability or
            responsibility for and Xcavate shall not have any liability or responsibility for
            any Losses directly or indirectly arising out of or related to the Xcavate
            Services. 2. You hereby agree to release Xcavate from liability for any and all
            such Losses, and you shall indemnify and save and hold Xcavate harmless from and
            against all such Losses incurred by you as a result of your use of any Xcavate
            Services in breach of these Terms, and/or in violation of applicable Law. To the
            maximum extent permitted by applicable Law, the foregoing indemnity and limitations
            of liability and releases shall apply whether the alleged liability or Losses are
            based on contract, negligence, tort, unjust enrichment, strict liability, violation
            of law or regulation, or any other basis, even if Xcavate has been advised of or
            should have known of the possibility of such Losses and damages, and without regard
            to the success or effectiveness of any other remedies. 3. To the fullest extent
            permissible by Law, the maximum aggregate monetary liability of Xcavate under these
            Terms shall in no event exceed the fees paid by you to Xcavate (if any) in respect
            of the Xcavate Services in relation to which the liability has arisen. 12. FORCE
            MAJEURE Xcavate is not responsible for Losses caused by delay or failure of Xcavate
            including when the delay or failure is due to fires; strikes; floods; power outages
            or failures; epidemics, pandemics and public health events; acts of God or the
            state’s enemies; acts of any Government or Government Official; any and all market
            movements, shifts, or volatility; computer, server, protocol or internet
            malfunctions; security breaches or cyberattacks; criminal acts; delays or defaults
            caused by common carriers; acts or omissions of other Persons; or, any other
            delays, defaults, failures or interruptions that cannot reasonably be foreseen or
            provided against by Xcavate. 13. MANDATORY RESOLUTION OF DISPUTES THROUGH
            ARBITRATION 1. Covered Claims. Except for excluded claims described below in
            Section 13.2, Xcavate and you each agree that any dispute, claim or controversy
            arising out of or relating to: (i) these Terms or the existence, breach,
            termination, enforcement, interpretation or validity thereof; or (ii) your use of
            any Xcavate Services at any time will be subject to and finally resolved by
            confidential, binding arbitration on an individual basis and not in a class,
            representative or consolidated action or proceeding. Arbitration will be conducted
            through the use of videoconferencing technology (unless both parties agree that an
            in-person hearing is appropriate given the nature of the dispute) before a single
            arbitrator in accordance with the International Institute for Conflict Prevention
            and Resolution International Non-Administered Arbitration Rules, as amended from
            time to time (the “CPR Rules”). The sole arbitrator must be a legal practitioner in
            the United Kingdom with at least fifteen (15) years of experience in commercial
            disputes, that holds a current practising certificate. If an arbitrator cannot be
            jointly appointed by the arbitration parties within thirty (30) days of the
            commencement of the arbitration, an arbitrator meeting the above qualifications
            will be selected by the International Institute for Conflict Prevent and
            Resolution. Judgment upon the award rendered by the arbitrator may be entered by
            any court having jurisdiction thereof. If the arbitral parties do not promptly
            agree on the seat of arbitration if an in-person hearing is selected, the seat will
            be the United Kingdom. The language of the arbitral proceedings will be English. No
            discovery shall be conducted except by agreement of the parties or after approval
            by the arbitrator, who shall attempt to minimize the burden of discovery. The
            arbitrator may award any relief that a court of competent jurisdiction could award,
            including attorneys’ fees when authorized by Laws, and the arbitral decision may be
            enforced in court. The prevailing party, as determined by the arbitrator, will be
            entitled to its costs of the arbitration (including the arbitrator’s fees) and its
            reasonable attorney’s fees and costs. 2. Excluded Claims. The following claims and
            causes of action will be excluded from arbitration as described in Section 13.1:
            causes of action or claims in which either Party seeks injunctive or other
            equitable relief for the alleged unlawful use of its intellectual property or its
            confidential information or private data. The Parties shall be at liberty to pursue
            claims or causes of actions excluded from arbitration through any court of
            competent jurisdiction. 3. Delegation. The arbitrator will have the power to hear
            and determine challenges to its jurisdiction, including any objections with respect
            to the formation, existence, scope, enforceability or validity of the arbitration
            agreement. This authority extends to jurisdictional challenges with respect to both
            the subject matter of the dispute and the parties to the arbitration. Further, the
            arbitrator will have the power to determine the existence, validity, or scope of
            the contract of which an arbitration clause forms a part. For the purposes of
            challenges to the jurisdiction of the arbitrator, each clause within this Section
            13 will be considered as separable from any contract of which it forms a part. Any
            challenges to the jurisdiction of the arbitrator, except challenges based on the
            award itself, will be made not later than the notice of defense or, with respect to
            a counterclaim, the reply to the counterclaim; provided , however , that if a claim
            or counterclaim is later added or amended such a challenge may be made not later
            than the response to such claim or counterclaim as provided under CPR Rules. 4.
            Class Action Waiver. You and Xcavate expressly intend and agree that: (i) class
            action and representative action procedures are hereby waived and will not be
            asserted, nor will they apply, in any arbitration pursuant to these Terms; (ii)
            neither you nor Xcavate will assert class action or representative action claims
            against the other in arbitration or otherwise; (iii) each of you and Xcavate will
            only submit their own, individual claims in arbitration and will not seek to
            represent the interests of any other Person, or consolidate claims with any other
            Person; (iv) nothing in these Terms will be interpreted as your or Xcavate’s intent
            to arbitrate Claims on a class or representative basis; and (v) any relief awarded
            to any one User cannot and may not affect any other User. No adjudicator may
            consolidate or join more than one Person’s or Party’s claims and may not otherwise
            preside over any form of a consolidated, representative, or class proceeding. 5.
            Confidentiality. You and Xcavate will maintain the confidential nature of the
            arbitration proceeding and any award, including the hearing, except as may be
            necessary to prepare for or conduct the arbitration hearing on the merits, or
            except as may be necessary in connection with a court application for a preliminary
            remedy, a judicial challenge to an award or its enforcement, or unless otherwise
            required by Law or judicial decision. 14. MISCELLANEOUS 1. Governing Law. These
            Terms shall be governed by and construed and enforced in accordance with the Laws
            of England and Wales and shall be interpreted in all respects as a contract under
            English law. Any transaction, dispute, controversy, claim or action arising from or
            related to your access to the Xcavate Services shall be governed by the Laws of
            England and Wales, exclusive of choice-of-law principles. 2. Not Acting in
            Partnership. Nothing herein, including the provision of the Xcavate Services, shall
            be deemed or construed to create a partnership, joint venture, agency relationship
            or association between you and Xcavate. No Party shall have any right, power or
            authority to enter into any agreement or undertaking for or act on behalf of, or to
            act as or be an agent or representative of, or to otherwise bind, the other Party.
            In providing the Xcavate Services, Xcavate is acting as a service provider, and not
            an agent, of the User or any other Person. 3. No Waiver; Available Remedies. Any
            failure by Xcavate to exercise any of its rights, powers, or remedies under these
            Terms, or any delay by Xcavate in doing so, does not constitute a waiver of any
            such right, power, or remedy. The single or partial exercise of any right, power,
            or remedy by Xcavate does not prevent it from exercising any other rights, powers,
            or remedies. The remedies of Xcavate are cumulative with and not exclusive of any
            other remedy conferred by the provisions of these Terms, or by law or equity. You
            agree that the remedies to which Xcavate is entitled include (i) injunctions to
            prevent breaches of these Terms and to enforce specifically the terms and
            provisions hereof, (ii) the right to recover the amount of any Losses by set off
            against any amounts that Xcavate would otherwise be obligated to pay to you, and
            (iii) the right to seize and recover against any of your assets, or your interests
            therein, that are held by Xcavate. 4. Assignment and Third Party Rights:. These
            Terms, and any of the rights, duties, and obligations contained or incorporated
            herein, are not assignable by you without prior written consent of Xcavate and any
            attempt by you to assign these Terms without Xcavate’s written consent is void.
            These Terms, and any of the rights, duties, and obligations contained herein, are
            freely assignable by Xcavate, in whole or in part, without notice or your consent
            (for clarity, this assignment right includes the right for Xcavate to assign any
            claim, in whole or in part, arising hereunder). Any attempt by you to assign these
            Terms without written consent is void. Subject to the foregoing, these Terms, and
            any of the rights, duties, and obligations contained or incorporated herein, shall
            be binding upon and inure to the benefit of the heirs, executors, administrators,
            personal or legal representatives, successors and assigns of you and of Xcavate.
            None of the provisions of these Terms, or any of the rights, duties, and
            obligations contained or incorporated herein, are for the benefit of or enforceable
            by any creditors of you or Xcavate or any other persons, except such as inure to a
            successor or assign in accordance herewith. No consent of any Person is required
            for any modification or amendment to these Terms. 5. No Liability for Termination.
            Xcavate shall not be liable to you or any other Person for termination of your
            access to the Xcavate Services. 6. Severability. If any provision of these Terms or
            part thereof, as amended from time to time, is determined to be invalid, void, or
            unenforceable, in whole or in part, by any court of competent jurisdiction, such
            invalidity, voidness, or unenforceability attaches only to such provision to the
            extent of its illegality, unenforceability, invalidity, or voidness, as may be, and
            everything else in these Terms continues in full force and effect. 7. Electronic
            Communications and Acceptance. You agree and consent to receive electronically all
            communications, agreements, documents, receipts, notices and disclosures that
            Xcavate may provide in connection with these Terms through publication on any part
            of the [which site?] or to your authorized e-mail address on file with Xcavate.
            Such notices shall be deemed effective and received by you on the date on which the
            notice is published on any part of the [site] or on which the e-mail is sent to
            such authorized e-mail address. These Terms may be accepted by your accessing or
            using any of the Xcavate Services and it is the intention of the parties that such
            acceptance shall be deemed to be as valid as an original signature being applied to
            these Terms.
          </p>
        </div>
      </div>
    </Shell>
  );
}
