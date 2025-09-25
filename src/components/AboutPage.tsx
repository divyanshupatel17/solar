import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Users, Zap, Shield, Database, Brain, Smartphone, Github, Linkedin, Mail, Award, Target, Lightbulb } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

const AboutPage = () => {
  const teamMembers = [
    {
      name: "John Doe",
      role: "Full Stack Developer",
      avatar: "JD",
      bio: "Expert in React, Node.js, and system architecture. Passionate about clean energy solutions.",
      skills: ["React", "Node.js", "TypeScript", "AWS"],
      social: {
        github: "johndoe-dev",
        linkedin: "john-doe",
        email: "john@solartokens.dev"
      }
    },
    {
      name: "Krishna Patel", 
      role: "Blockchain Developer",
      avatar: "KP",
      bio: "Solidity expert with experience in DeFi protocols and smart contract security.",
      skills: ["Solidity", "Web3", "Ethereum", "DeFi"],
      social: {
        github: "krishna-blockchain",
        linkedin: "krishna-patel-dev",
        email: "krishna@solartokens.dev"
      }
    },
    {
      name: "Soumil Singh",
      role: "IoT Engineer", 
      avatar: "SS",
      bio: "Hardware specialist focusing on sensor networks and real-time data processing.",
      skills: ["Arduino", "Raspberry Pi", "MQTT", "Python"],
      social: {
        github: "soumil-iot",
        linkedin: "soumil-singh-iot",
        email: "soumil@solartokens.dev"
      }
    },
    {
      name: "Priya Gupta",
      role: "ML Engineer",
      avatar: "PG", 
      bio: "Machine learning researcher specializing in energy forecasting and anomaly detection.",
      skills: ["Python", "TensorFlow", "Scikit-learn", "Time Series"],
      social: {
        github: "priya-ml",
        linkedin: "priya-gupta-ml",
        email: "priya@solartokens.dev"
      }
    },
    {
      name: "Rahul Kumar",
      role: "UI/UX Designer",
      avatar: "RK",
      bio: "Design systems expert creating intuitive interfaces for complex blockchain applications.",
      skills: ["Figma", "Design Systems", "Prototyping", "User Research"],
      social: {
        github: "rahul-design",
        linkedin: "rahul-kumar-design",
        email: "rahul@solartokens.dev"
      }
    },
    {
      name: "Ananya Das",
      role: "Product Manager", 
      avatar: "AD",
      bio: "Strategic product leader with experience in sustainable tech and blockchain adoption.",
      skills: ["Product Strategy", "Market Research", "Agile", "Stakeholder Management"],
      social: {
        github: "ananya-pm",
        linkedin: "ananya-das-pm", 
        email: "ananya@solartokens.dev"
      }
    }
  ];

  const techStack = [
    { name: "IoT Sensors", icon: Smartphone, description: "Real-time energy monitoring", color: "text-[#FFD43B]" },
    { name: "Machine Learning", icon: Brain, description: "Predictive analytics & forecasting", color: "text-[#4285F4]" },
    { name: "Blockchain", icon: Shield, description: "Secure token transactions", color: "text-[#34A853]" },
    { name: "Database", icon: Database, description: "Scalable data storage", color: "text-purple-500" },
  ];

  const projectStats = [
    { label: "Project Status", value: "MVP", icon: Target },
    { label: "Development Phase", value: "Prototype", icon: Database },
    { label: "Team Members", value: "6", icon: Users },
    { label: "Technologies", value: "12+", icon: Lightbulb }
  ];

  const achievements = [
    "🏆 Innovative Clean Energy Solution",
    "🌟 Best Innovation in Clean Energy",
    "🔗 Most Promising Blockchain Application",
    "💡 Outstanding Technical Implementation"
  ];

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="text-center space-y-4">
        <Badge className="bg-[#FFD43B]/20 text-[#FFD43B] border-[#FFD43B]/30 px-4 py-2">
          <Award className="w-4 h-4 mr-2" />
          Demo Mode
        </Badge>
        <h1 className="text-4xl text-gray-900">About Solar Token System</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Revolutionizing clean energy through IoT monitoring, blockchain tokenization, and ML-powered analytics
        </p>
      </div>

      {/* Project Introduction */}
      <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl rounded-3xl">
        <CardContent className="p-8 md:p-12">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl text-gray-900">Our Vision</h2>
              <p className="text-gray-600 leading-relaxed">
                Solar Token System bridges the gap between renewable energy production and decentralized finance. 
                By combining IoT sensors, machine learning, and blockchain technology, we create a transparent, 
                efficient marketplace for solar energy trading.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Our platform empowers individuals and organizations to monetize their solar energy production, 
                contributing to a sustainable future while earning rewards through our innovative tokenization system.
              </p>
              
              {/* Achievements */}
              <div className="space-y-2">
                <h3 className="text-lg text-gray-900">Key Achievements</h3>
                <div className="grid md:grid-cols-2 gap-2">
                  {achievements.map((achievement, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm text-gray-700">
                      <span>{achievement}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-[#FFD43B]/20 to-[#34A853]/20 rounded-2xl blur-xl"></div>
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1616344787254-d4575aa102ae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFtJTIwcHJvZmVzc2lvbmFsJTIwZGV2ZWxvcGVyc3xlbnwxfHx8fDE3NTg0NDgwNzR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Team collaboration"
                className="relative w-full h-80 object-cover rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Technology Stack */}
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-3xl text-gray-900 mb-4">Technology Stack</h2>
          <p className="text-gray-600">Cutting-edge technologies powering our platform</p>
        </div>
        
        <div className="grid md:grid-cols-4 gap-6">
          {techStack.map((tech, index) => {
            const Icon = tech.icon;
            return (
              <Card key={index} className="bg-white/90 backdrop-blur-sm border-0 shadow-lg rounded-2xl hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-6 text-center">
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gray-50 flex items-center justify-center ${tech.color}`}>
                    <Icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-lg text-gray-900 mb-2">{tech.name}</h3>
                  <p className="text-sm text-gray-600">{tech.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Project Statistics */}
      <Card className="bg-gradient-to-br from-[#FFD43B]/10 to-[#34A853]/10 border-0 shadow-xl rounded-3xl">
        <CardContent className="p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl text-gray-900 mb-4">Project Statistics</h2>
            <p className="text-gray-600">Numbers that define our journey</p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-6">
            {projectStats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-white rounded-2xl shadow-lg flex items-center justify-center">
                    <Icon className="w-8 h-8 text-[#4285F4]" />
                  </div>
                  <p className="text-2xl text-gray-900 mb-1">{stat.value}</p>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Team Section */}
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-3xl text-gray-900 mb-4">Meet Our Team</h2>
          <p className="text-gray-600">The passionate individuals behind Solar Token System</p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <Card key={index} className="bg-white/90 backdrop-blur-sm border-0 shadow-lg rounded-2xl hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-6">
                <div className="text-center mb-4">
                  <div className="w-20 h-20 bg-gradient-to-br from-[#FFD43B] to-[#34A853] rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <span className="text-white text-2xl">{member.avatar}</span>
                  </div>
                  <h3 className="text-xl text-gray-900 mb-1">{member.name}</h3>
                  <Badge className="bg-[#4285F4]/20 text-[#4285F4] border-[#4285F4]/30 mb-3">
                    {member.role}
                  </Badge>
                  <p className="text-sm text-gray-600 mb-4">{member.bio}</p>
                </div>
                
                {/* Skills */}
                <div className="mb-4">
                  <div className="flex flex-wrap gap-1 justify-center">
                    {member.skills.map((skill, skillIndex) => (
                      <Badge key={skillIndex} variant="outline" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                {/* Social Links */}
                <div className="flex justify-center space-x-3">
                  <Button variant="ghost" size="sm" className="p-2 h-8 w-8">
                    <Github className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="p-2 h-8 w-8">
                    <Linkedin className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="p-2 h-8 w-8">
                    <Mail className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Architecture Overview */}
      <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl rounded-3xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-gray-900 text-center justify-center">
            <Zap className="w-6 h-6 text-[#FFD43B]" />
            System Architecture
          </CardTitle>
        </CardHeader>
        <CardContent className="p-8">
          <div className="bg-gray-50 rounded-2xl p-8 text-center">
            <div className="grid md:grid-cols-3 gap-8 items-center">
              <div className="space-y-4">
                <div className="w-16 h-16 bg-[#FFD43B] rounded-2xl flex items-center justify-center mx-auto">
                  <Smartphone className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg text-gray-900">IoT Layer</h3>
                <p className="text-sm text-gray-600">Smart sensors collect real-time energy data from solar panels</p>
              </div>
              
              <div className="space-y-4">
                <div className="w-16 h-16 bg-[#4285F4] rounded-2xl flex items-center justify-center mx-auto">
                  <Brain className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg text-gray-900">Processing Layer</h3>
                <p className="text-sm text-gray-600">ML algorithms analyze data and generate predictive insights</p>
              </div>
              
              <div className="space-y-4">
                <div className="w-16 h-16 bg-[#34A853] rounded-2xl flex items-center justify-center mx-auto">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg text-gray-900">Blockchain Layer</h3>
                <p className="text-sm text-gray-600">Smart contracts mint tokens and enable secure trading</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Contact Section */}
      <Card className="bg-gradient-to-r from-[#FFD43B] to-[#34A853] border-0 shadow-xl rounded-3xl">
        <CardContent className="p-8 text-center">
          <h2 className="text-3xl text-white mb-4">Get In Touch</h2>
          <p className="text-xl text-white/90 mb-8">
            Interested in collaborating or learning more about our project?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-white text-gray-900 hover:bg-gray-100 rounded-xl px-8 py-6">
              <Mail className="w-5 h-5 mr-2" />
              Contact Us
            </Button>
            <Button variant="outline" className="border-white text-white hover:bg-white/10 rounded-xl px-8 py-6">
              <Github className="w-5 h-5 mr-2 text-white" />
              <span className="text-white">View Source Code</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AboutPage;