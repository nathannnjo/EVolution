import React, { useState } from "react";
import {
  Battery,
  Zap,
  Car,
  Leaf,
  DollarSign,
  Wrench,
  PlayCircle,
  Users,
  Snowflake,
  Sun,
  ChevronDown,
  ChevronUp,
  Download,
  MapPin,
  Calculator,
  Clock,
  Smartphone,
  Home,
  TrendingUp,
  Shield,
  AlertCircle,
  CheckCircle,
} from "lucide-react";

const EvCareTipsPage = () => {
  const [activeAccordion, setActiveAccordion] = useState(null);
  const [flippedCards, setFlippedCards] = useState({});
  const [carModel, setCarModel] = useState("");
  const [carVideos, setCarVideos] = useState([]);

  const toggleAccordion = (index) => {
    setActiveAccordion(activeAccordion === index ? null : index);
  };

  const toggleFlipCard = (index) => {
    setFlippedCards((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const searchCarVideos = () => {
    const mockVideos = {
      "tesla model 3": [
        {
          title: "Tesla Model 3 Charging Guide for Beginners",
          duration: "8:45",
        },
        { title: "Model 3 Winter Driving Tips", duration: "6:20" },
        {
          title: "Understanding Model 3 Regenerative Braking",
          duration: "5:15",
        },
      ],
      "nissan leaf": [
        { title: "Nissan LEAF Complete Charging Tutorial", duration: "10:30" },
        { title: "LEAF Battery Care Best Practices", duration: "7:45" },
        { title: "CHAdeMO Fast Charging Explained", duration: "5:50" },
      ],
      "chevy bolt": [
        { title: "Chevy Bolt EV Charging Basics", duration: "9:15" },
        { title: "Bolt EV Cold Weather Performance", duration: "6:40" },
        { title: "DC Fast Charging with Bolt EV", duration: "4:55" },
      ],
    };

    const searchKey = carModel.toLowerCase();
    const matchedVideos = mockVideos[searchKey] || [
      { title: `${carModel} EV Basics for New Owners`, duration: "8:00" },
      { title: `${carModel} Charging Guide`, duration: "6:30" },
      { title: `${carModel} Maintenance Tips`, duration: "5:45" },
    ];

    setCarVideos(matchedVideos);
  };

  const faqs = [
    {
      question: "How long do EV batteries last?",
      answer:
        "Most EV batteries are designed to last 8-15 years or 100,000-200,000 miles. Many manufacturers offer 8-year warranties on their batteries, and real-world data shows most batteries retain 80-90% of their capacity after 8 years.",
    },
    {
      question: "Can I charge my EV at home?",
      answer:
        "Yes! Most EV owners charge at home using a standard outlet (Level 1) or a dedicated 240V outlet (Level 2). Level 2 charging is faster and more convenient for daily use. You may need an electrician to install a Level 2 charger.",
    },
    {
      question: "What about range anxiety?",
      answer:
        "Range anxiety decreases with experience. Most daily driving is under 40 miles, well within any EV's range. Plan longer trips using apps like PlugShare or your car's navigation system to locate charging stations along your route.",
    },
    {
      question: "How does cold weather affect my EV?",
      answer:
        "Cold weather can reduce range by 10-20%, mainly due to cabin heating. Pre-conditioning your car while plugged in, using seat heaters instead of cabin heat, and parking in a garage can help maintain range.",
    },
    {
      question: "Are EVs really cheaper to maintain?",
      answer:
        "Yes! EVs have fewer moving parts, no oil changes, and brake pads last longer due to regenerative braking. You'll save on maintenance, though you may need to replace tires more frequently due to instant torque.",
    },
    {
      question: "Is it safe to charge in the rain?",
      answer:
        "Absolutely! EV charging systems are designed to be waterproof and safe in all weather conditions. The charging port and connector have multiple safety systems to prevent electrical issues, even in heavy rain or snow.",
    },
  ];

  const myths = [
    {
      myth: "EV batteries die completely after a few years",
      fact: "EV batteries typically retain 80-90% capacity after 8 years. They degrade gradually, not suddenly, and most come with extensive warranties.",
    },
    {
      myth: "EVs are slower than gas cars",
      fact: "EVs provide instant torque, making them incredibly quick off the line. Many EVs can outaccelerate sports cars from 0-60 mph.",
    },
    {
      myth: "Charging takes forever",
      fact: "Home charging happens overnight while you sleep. DC fast charging can add 200+ miles of range in 20-30 minutes for road trips.",
    },
    {
      myth: "EVs don't work in cold weather",
      fact: "EVs work fine in cold weather. While range may decrease 10-20% in extreme cold, proper preparation and pre-conditioning minimize the impact.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-50 to-blue-50">
      <section className="relative py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg">
            <Car className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6">
            Your EV Journey Made <span className="text-green-600">Simple</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Welcome to electric driving! We'll guide you through everything you
            need to know to confidently own and enjoy your EV. It's easier than
            you think.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2">
              <PlayCircle className="w-5 h-5" />
              Watch Getting Started Video
            </button>
            <button className="px-8 py-4 bg-white text-gray-800 border-2 border-gray-300 rounded-lg hover:border-green-600 transition-colors flex items-center justify-center gap-2">
              <Download className="w-5 h-5" />
              Download Quick Guide
            </button>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">
            EV Basics Made Simple
          </h2>
          <p className="text-lg text-gray-600 text-center mb-12 max-w-3xl mx-auto">
            Understanding how your EV works helps you make the most of it. Here
            are the fundamentals.
          </p>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-2xl text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Battery className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                How EVs Work
              </h3>
              <p className="text-gray-600">
                Electric motors use energy from a battery pack to spin the
                wheels. No combustion, no emissions, just clean, quiet power.
              </p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-2xl text-center">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                Charging Simplified
              </h3>
              <p className="text-gray-600">
                Plug in at home overnight or use public chargers on the go. Your
                car tells you where to charge and how long it takes.
              </p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-8 rounded-2xl text-center">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Leaf className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                Regenerative Braking
              </h3>
              <p className="text-gray-600">
                When you lift off the accelerator, the motor becomes a
                generator, capturing energy and slowing the car naturally.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-gradient-to-r from-gray-50 to-gray-100">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">
            Battery Care & Longevity
          </h2>
          <p className="text-lg text-gray-600 text-center mb-12 max-w-3xl mx-auto">
            Simple habits to keep your battery healthy for years to come.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center mb-6">
                <Battery className="w-7 h-7 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                Charge Between 20-80%
              </h3>
              <p className="text-gray-600">
                For daily driving, keep your battery between 20-80%. Only charge
                to 100% before long trips. This maximizes battery lifespan.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                <Snowflake className="w-7 h-7 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                Cold Weather Care
              </h3>
              <p className="text-gray-600">
                Pre-condition your car while plugged in. Park in a garage when
                possible. Use seat heaters to save energy.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <div className="w-14 h-14 bg-orange-100 rounded-xl flex items-center justify-center mb-6">
                <Sun className="w-7 h-7 text-orange-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                Hot Weather Tips
              </h3>
              <p className="text-gray-600">
                Park in shade when possible. Use scheduled charging to avoid
                peak heat. Pre-cool while plugged in.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Smart Charging Strategies
          </h2>

          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                <Home className="w-7 h-7 text-blue-600" />
                Home Charging
              </h3>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">
                      Charge During Off-Peak Hours
                    </h4>
                    <p className="text-gray-600">
                      Usually 10 PM - 6 AM. Lower electricity rates save money
                      and reduce grid stress.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Zap className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">
                      Level 2 is Best
                    </h4>
                    <p className="text-gray-600">
                      240V charging is 4-6x faster than standard outlets and
                      more efficient for daily use.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                <MapPin className="w-7 h-7 text-purple-600" />
                Public Charging
              </h3>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Smartphone className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">
                      Use Charging Apps
                    </h4>
                    <p className="text-gray-600">
                      PlugShare, ChargePoint, and EVgo apps show real-time
                      availability and pricing.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="w-6 h-6 text-orange-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">
                      Fast Charging Strategy
                    </h4>
                    <p className="text-gray-600">
                      Charge to 80% at DC fast chargers for road trips. Speed
                      slows after 80%.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-gradient-to-r from-gray-50 to-blue-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Driving & Maintenance Made Easy
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center mb-6">
                <Leaf className="w-7 h-7 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                Master Regenerative Braking
              </h3>
              <p className="text-gray-600">
                Start with mild regen settings, then increase as you get
                comfortable. It's like engine braking but captures energy back
                to the battery.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                <Car className="w-7 h-7 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                Tire Care Tips
              </h3>
              <p className="text-gray-600">
                EVs are heavier and have instant torque. Rotate tires every
                6,000 miles and check pressure monthly for optimal efficiency.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center mb-6">
                <Smartphone className="w-7 h-7 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                Software Updates
              </h3>
              <p className="text-gray-600">
                Keep your EV updated! Software updates can improve range, add
                features, and fix issues. Many happen automatically overnight.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-gradient-to-br from-green-50 to-blue-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Your Savings Add Up
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <DollarSign className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                Fuel Savings
              </h3>
              <p className="text-3xl font-bold text-green-600 mb-4">$1,200+</p>
              <p className="text-gray-600">
                Average annual savings on fuel costs compared to gas vehicles.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Wrench className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                Maintenance Savings
              </h3>
              <p className="text-3xl font-bold text-blue-600 mb-4">50%</p>
              <p className="text-gray-600">
                Less maintenance needed - no oil changes, fewer moving parts to
                service.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                Tax Incentives
              </h3>
              <p className="text-3xl font-bold text-purple-600 mb-4">$7,500</p>
              <p className="text-gray-600">
                Federal tax credit available for eligible new EV purchases.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Frequently Asked Questions
          </h2>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-2xl overflow-hidden"
              >
                <button
                  onClick={() => toggleAccordion(index)}
                  className="w-full px-8 py-6 text-left bg-gray-50 hover:bg-gray-100 transition-colors flex items-center justify-between"
                >
                  <span className="font-semibold text-gray-800">
                    {faq.question}
                  </span>
                  {activeAccordion === index ? (
                    <ChevronUp className="w-5 h-5 text-gray-600" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-600" />
                  )}
                </button>
                {activeAccordion === index && (
                  <div className="px-8 py-6 bg-white">
                    <p className="text-gray-600 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-gradient-to-r from-red-50 to-orange-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">
            Myth Busters
          </h2>
          <p className="text-lg text-gray-600 text-center mb-12">
            Click the cards to reveal the truth about EVs
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {myths.map((item, index) => (
              <div key={index} className="h-64 perspective-1000">
                <div
                  className={`relative w-full h-full transform-style-preserve-3d transition-transform duration-700 cursor-pointer ${
                    flippedCards[index] ? "rotate-y-180" : ""
                  }`}
                  onClick={() => toggleFlipCard(index)}
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <div
                    className="absolute inset-0 bg-red-500 rounded-2xl p-6 flex flex-col items-center justify-center text-center text-white shadow-lg"
                    style={{ backfaceVisibility: "hidden" }}
                  >
                    <AlertCircle className="w-12 h-12 mb-4" />
                    <h3 className="text-lg font-bold mb-2">MYTH</h3>
                    <p className="text-sm">{item.myth}</p>
                    <p className="text-xs mt-4 opacity-80">
                      Click to reveal truth
                    </p>
                  </div>

                  <div
                    className="absolute inset-0 bg-green-500 rounded-2xl p-6 flex flex-col items-center justify-center text-center text-white shadow-lg"
                    style={{
                      backfaceVisibility: "hidden",
                      transform: "rotateY(180deg)",
                    }}
                  >
                    <CheckCircle className="w-12 h-12 mb-4" />
                    <h3 className="text-lg font-bold mb-2">FACT</h3>
                    <p className="text-sm">{item.fact}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-gray-900 text-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">
            Video Learning Hub
          </h2>
          <p className="text-lg text-gray-300 text-center mb-12">
            Watch and learn from EV experts
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "EV Charging Basics for Beginners",
                duration: "8:45",
                thumbnail: "charging-basics",
              },
              {
                title: "Winter EV Driving Tips",
                duration: "6:20",
                thumbnail: "winter-tips",
              },
              {
                title: "Understanding Regenerative Braking",
                duration: "5:15",
                thumbnail: "regen-braking",
              },
            ].map((video, index) => (
              <div
                key={index}
                className="bg-gray-800 rounded-2xl overflow-hidden hover:bg-gray-700 transition-colors cursor-pointer"
              >
                <div className="aspect-video bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
                  <PlayCircle className="w-16 h-16 text-white opacity-80" />
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-lg mb-2">{video.title}</h3>
                  <p className="text-gray-400">{video.duration}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-white" data-video-finder>
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">
            Find Videos for Your EV
          </h2>
          <p className="text-lg text-gray-600 text-center mb-8">
            Get personalized video guides for your specific vehicle
          </p>

          <div className="flex gap-4 mb-8">
            <input
              type="text"
              placeholder="Enter your EV make and model (e.g., Tesla Model 3)"
              value={carModel}
              onChange={(e) => setCarModel(e.target.value)}
              className="flex-1 px-6 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
            <button
              onClick={searchCarVideos}
              className="px-8 py-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              Find Videos
            </button>
          </div>

          {carVideos.length > 0 && (
            <div className="grid gap-4">
              <h3 className="text-xl font-bold text-gray-800">
                Videos for {carModel}
              </h3>
              {carVideos.map((video, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                >
                  <div className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center">
                    <PlayCircle className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-800">
                      {video.title}
                    </h4>
                    <p className="text-gray-600">{video.duration}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="py-16 px-4 bg-gradient-to-r from-indigo-50 to-purple-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Take It With You
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Download our comprehensive EV owner's quick-start guide
          </p>

          <div className="bg-white p-8 rounded-2xl shadow-lg max-w-2xl mx-auto">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Download className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              EV Owner's Quick Reference
            </h3>
            <p className="text-gray-600 mb-6">
              A handy PDF cheat sheet covering charging basics, battery care,
              emergency tips, and more. Perfect for keeping in your glove
              compartment!
            </p>
            <button className="px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 mx-auto">
              <Download className="w-5 h-5" />
              Download Free Guide (PDF)
            </button>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Join the EV Community
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                EV Forums
              </h3>
              <p className="text-gray-600 mb-6">
                Connect with other EV owners, share experiences, and get advice.
              </p>
              <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Join Forums
              </button>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Car className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                Local EV Groups
              </h3>
              <p className="text-gray-600 mb-6">
                Meet local EV enthusiasts and attend meetups in your area.
              </p>
              <button className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                Find Groups
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-gradient-to-r from-green-600 to-green-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Master Your EV?
          </h2>
          <p className="text-xl mb-12 opacity-90">
            You've got this! Electric driving is simpler than you thought, and
            we're here to help every step of the way.
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            <button className="px-8 py-4 bg-white text-green-600 rounded-lg hover:bg-gray-100 transition-colors flex items-center justify-center gap-2 font-semibold">
              <MapPin className="w-5 h-5" />
              Find Charging Stations
            </button>
            <button className="px-8 py-4 bg-white text-blue-600 rounded-lg hover:bg-gray-100 transition-colors flex items-center justify-center gap-2 font-semibold">
              <PlayCircle className="w-5 h-5" />
              Watch Guides for My Car
            </button>
            <button className="px-8 py-4 bg-white text-purple-600 rounded-lg hover:bg-gray-100 transition-colors flex items-center justify-center gap-2 font-semibold">
              <Calculator className="w-5 h-5" />
              Estimate My Savings
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EvCareTipsPage;
