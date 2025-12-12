'use client';

import Image from 'next/image';
import { Code, Zap, Heart, GraduationCap, User, Trophy, Briefcase, Calendar, Users } from 'lucide-react';
import {
  ThemeCard,
  ThemeCardHeader,
  ThemeCardBody,
  ThemeTitle,
  ThemeHeading,
  ThemeDetail,
} from './ThemeBox';
import {
  THEME_PRIMARY,
  THEME_PRIMARY_BORDER,
  THEME_PRIMARY_TINT,
  THEME_FONT_PRIMARY,
  THEME_CATEGORY_SKILLS_BG,
  THEME_CATEGORY_SKILLS_TEXT,
  THEME_CATEGORY_STRENGTHS_BG,
  THEME_CATEGORY_STRENGTHS_TEXT,
  THEME_CATEGORY_INTERESTS_BG,
  THEME_CATEGORY_INTERESTS_TEXT,
  THEME_CATEGORY_EDUCATION_BG,
  THEME_CATEGORY_EDUCATION_TEXT,
  THEME_CATEGORY_EXPERIENCE_BG,
  THEME_CATEGORY_EXPERIENCE_TEXT,
  THEME_CATEGORY_ACHIEVEMENTS_BG,
  THEME_CATEGORY_ACHIEVEMENTS_TEXT,
  THEME_CATEGORY_SUMMARY_BG,
  THEME_CATEGORY_SUMMARY_TEXT,
} from '../theme/palette';
import { personalInfo } from '../data/personalInfo';

export function AboutTab() {
  return (
    <div className="mx-auto max-w-7xl px-2 sm:px-4 md:px-6 pt-4 sm:pt-6 pb-4 sm:pb-6 lg:px-8" style={{ fontFamily: THEME_FONT_PRIMARY }}>
      {/* Header */}
      <div className="mb-4 sm:mb-6 flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 border-b pb-4 sm:pb-6" style={{ borderColor: THEME_PRIMARY_BORDER }}>
        <div className="flex items-center gap-2 sm:gap-3 md:gap-4 flex-1 min-w-0 w-full sm:w-auto">
          {/* Profile Image Space */}
          <div
            className="relative h-16 w-16 sm:h-20 sm:w-20 md:h-24 md:w-24 flex-shrink-0 overflow-hidden rounded-full"
            style={{
              background: THEME_PRIMARY_TINT,
              border: `2px solid ${THEME_PRIMARY_BORDER}`,
            }}
          >
            {/* Placeholder - replace with actual image */}
            <div className="flex h-full w-full items-center justify-center bg-gray-800">
              <span className="text-lg sm:text-xl md:text-2xl font-bold" style={{ color: THEME_PRIMARY, fontFamily: THEME_FONT_PRIMARY }}>
                ST
              </span>
            </div>
            {/* Uncomment and add your image path when ready:
            <Image
              src="/path-to-your-profile-image.jpg"
              alt="Sirasit Tumvijit"
              fill
              className="object-cover"
            />
            */}
          </div>
          <div className="flex-1 min-w-0 flex items-center justify-between gap-2 sm:gap-3 md:gap-4" style={{ fontFamily: THEME_FONT_PRIMARY }}>
            <div className="flex-1 min-w-0">
              <h1 className="mb-1 sm:mb-2 text-xl sm:text-2xl md:text-3xl font-bold uppercase text-white" style={{ fontFamily: THEME_FONT_PRIMARY }}>{personalInfo.name}</h1>
              <p className="text-sm sm:text-base md:text-lg" style={{ color: THEME_PRIMARY, fontFamily: THEME_FONT_PRIMARY }}>{personalInfo.title}</p>
            </div>
            <div className="flex-shrink-0 flex flex-col items-end gap-1 sm:gap-1.5 pr-2 sm:pr-3 md:pr-4" style={{ fontFamily: THEME_FONT_PRIMARY }}>
              <p className="text-sm font-semibold uppercase whitespace-nowrap" style={{ color: THEME_PRIMARY, fontFamily: THEME_FONT_PRIMARY }}>Languages:</p>
              <div className="flex flex-wrap justify-end gap-1.5 sm:gap-2 md:gap-3">
                {personalInfo.languages.map((lang) => (
                  <span key={lang} className="text-sm whitespace-nowrap" style={{ color: THEME_PRIMARY, fontFamily: THEME_FONT_PRIMARY }}>{lang}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Two Column Layout */}
      <div className="flex flex-col gap-4 sm:gap-5 md:gap-6 lg:flex-row">
        {/* Left Column */}
        <div className="space-y-4 sm:space-y-5 md:space-y-6 flex-shrink-0 lg:w-80">
          {/* SKILLS */}
          <ThemeCard>
            <ThemeCardHeader style={{ backgroundColor: THEME_CATEGORY_SKILLS_BG }}>
              <div className="flex items-center gap-2">
                <Code className="h-4 w-4" style={{ color: THEME_CATEGORY_SKILLS_TEXT }} />
                <ThemeTitle style={{ color: THEME_CATEGORY_SKILLS_TEXT, fontSize: '0.875rem', fontWeight: '700' }}>SKILLS</ThemeTitle>
              </div>
            </ThemeCardHeader>
            <ThemeCardBody style={{ backgroundColor: 'rgba(255, 193, 7, 0.05)' }}>
              <div className="space-y-3 sm:space-y-4">
                <div>
                  <h3 className="mb-2 sm:mb-3 md:mb-4 text-sm font-bold uppercase" style={{ color: THEME_PRIMARY, letterSpacing: '0.05em', fontFamily: THEME_FONT_PRIMARY }}>
                    Programming:
                  </h3>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {personalInfo.skills.programming.map((skill) => (
                      <span
                        key={skill}
                        className="rounded-md px-2 py-0.5 sm:px-2.5 sm:py-1 md:px-3 md:py-1 text-sm"
                        style={{
                          backgroundColor: THEME_PRIMARY_TINT,
                          border: `1px solid ${THEME_PRIMARY_BORDER}`,
                          color: THEME_PRIMARY,
                          fontFamily: THEME_FONT_PRIMARY,
                        }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="mb-2 sm:mb-3 md:mb-4 text-sm font-bold uppercase" style={{ color: THEME_PRIMARY, letterSpacing: '0.05em', fontFamily: THEME_FONT_PRIMARY }}>
                    Tools:
                  </h3>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {personalInfo.skills.tools.map((tool) => (
                      <span
                        key={tool}
                        className="rounded-md px-2 py-0.5 sm:px-2.5 sm:py-1 md:px-3 md:py-1 text-sm"
                        style={{
                          backgroundColor: THEME_PRIMARY_TINT,
                          border: `1px solid ${THEME_PRIMARY_BORDER}`,
                          color: THEME_PRIMARY,
                          fontFamily: THEME_FONT_PRIMARY,
                        }}
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </ThemeCardBody>
          </ThemeCard>

          {/* STRENGTHS and INTERESTS - Side by side on small screens */}
          <div className="flex flex-row items-stretch gap-3 sm:gap-4 lg:flex-col lg:gap-6">
            {/* STRENGTHS */}
            <ThemeCard className="flex-1 lg:flex-none flex flex-col">
              <ThemeCardHeader style={{ backgroundColor: THEME_CATEGORY_STRENGTHS_BG }}>
                <div className="flex items-center gap-2">
                  <Zap className="h-4 w-4" style={{ color: THEME_CATEGORY_STRENGTHS_TEXT }} />
                  <ThemeTitle style={{ color: THEME_CATEGORY_STRENGTHS_TEXT, fontSize: '0.875rem', fontWeight: '700' }}>STRENGTHS</ThemeTitle>
                </div>
              </ThemeCardHeader>
              <ThemeCardBody style={{ backgroundColor: 'rgba(255, 87, 34, 0.05)' }}>
                <div>
                  {personalInfo.strengths.map((strength) => (
                    <ThemeDetail key={strength}>{strength}</ThemeDetail>
                  ))}
                </div>
              </ThemeCardBody>
            </ThemeCard>

            {/* INTERESTS */}
            <ThemeCard className="flex-1 lg:flex-none flex flex-col">
              <ThemeCardHeader style={{ backgroundColor: THEME_CATEGORY_INTERESTS_BG }}>
                <div className="flex items-center gap-2">
                  <Heart className="h-4 w-4" style={{ color: THEME_CATEGORY_INTERESTS_TEXT }} />
                  <ThemeTitle style={{ color: THEME_CATEGORY_INTERESTS_TEXT, fontSize: '0.875rem', fontWeight: '700' }}>INTERESTS</ThemeTitle>
                </div>
              </ThemeCardHeader>
              <ThemeCardBody style={{ backgroundColor: 'rgba(0, 188, 212, 0.05)' }}>
                <div>
                  {personalInfo.interests.map((interest) => (
                    <ThemeDetail key={interest}>{interest}</ThemeDetail>
                  ))}
                </div>
              </ThemeCardBody>
            </ThemeCard>
          </div>

          {/* EDUCATION */}
          <ThemeCard>
            <ThemeCardHeader style={{ backgroundColor: THEME_CATEGORY_EDUCATION_BG }}>
              <div className="flex items-center gap-2">
                <GraduationCap className="h-4 w-4" style={{ color: THEME_CATEGORY_EDUCATION_TEXT }} />
                <ThemeTitle style={{ color: THEME_CATEGORY_EDUCATION_TEXT, fontSize: '0.875rem', fontWeight: '700' }}>EDUCATION</ThemeTitle>
              </div>
            </ThemeCardHeader>
            <ThemeCardBody style={{ backgroundColor: 'rgba(100, 181, 246, 0.05)' }}>
              <div className="space-y-1.5 sm:space-y-2">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <Calendar className="h-3.5 w-3.5 sm:h-4 sm:w-4" style={{ color: THEME_PRIMARY }} />
                  <p className="text-sm" style={{ color: THEME_PRIMARY, fontFamily: THEME_FONT_PRIMARY }}>{personalInfo.education.period}</p>
                </div>
                <ThemeHeading as="p" className="text-lg">
                  <a
                    href="https://www.bu.ac.th/th"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:opacity-80 transition-opacity"
                    style={{ color: 'inherit' }}
                  >
                    Bangkok University
                  </a>
                  {' 3\'rd year'}
                </ThemeHeading>
                <div>
                  <ThemeDetail>{personalInfo.education.degree}</ThemeDetail>
                  <ThemeDetail>{personalInfo.education.major}</ThemeDetail>
                </div>
              </div>
            </ThemeCardBody>
          </ThemeCard>
        </div>

        {/* Right Column */}
        <div className="space-y-4 sm:space-y-5 md:space-y-6 flex-1 min-w-0">
          {/* PROFESSIONAL SUMMARY */}
          <ThemeCard>
            <ThemeCardHeader style={{ backgroundColor: THEME_CATEGORY_SUMMARY_BG }}>
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" style={{ color: THEME_CATEGORY_SUMMARY_TEXT }} />
                <ThemeTitle style={{ color: THEME_CATEGORY_SUMMARY_TEXT, fontSize: '0.875rem', fontWeight: '700' }}>PROFESSIONAL SUMMARY</ThemeTitle>
              </div>
            </ThemeCardHeader>
            <ThemeCardBody style={{ backgroundColor: 'rgba(171, 71, 188, 0.05)' }}>
              <div
                className="text-sm leading-relaxed"
                style={{
                  color: '#dfe6ea',
                  fontFamily: THEME_FONT_PRIMARY,
                }}
                dangerouslySetInnerHTML={{
                  __html: personalInfo.professionalSummary.replace(
                    /\*\*(.*?)\*\*/g,
                    '<strong class="text-white">$1</strong>'
                  ),
                }}
              />
            </ThemeCardBody>
          </ThemeCard>

          {/* KEY ACHIEVEMENTS */}
          <ThemeCard>
            <ThemeCardHeader style={{ backgroundColor: THEME_CATEGORY_ACHIEVEMENTS_BG }}>
              <div className="flex items-center gap-2">
                <Trophy className="h-4 w-4" style={{ color: THEME_CATEGORY_ACHIEVEMENTS_TEXT }} />
                <ThemeTitle style={{ color: THEME_CATEGORY_ACHIEVEMENTS_TEXT, fontSize: '0.875rem', fontWeight: '700' }}>KEY ACHIEVEMENTS</ThemeTitle>
              </div>
            </ThemeCardHeader>
            <ThemeCardBody style={{ backgroundColor: 'rgba(255, 193, 7, 0.05)' }}>
              <div className="space-y-3 sm:space-y-4">
                {personalInfo.achievements.map((achievement, index) => (
                  <div key={index}>
                    <ThemeHeading as="p" className="text-base mb-1">
                      {achievement.titleLinks && achievement.titleLinks.length > 0 ? (
                        (() => {
                          const text = achievement.title;
                          const elements: React.ReactNode[] = [];
                          const linkMap = new Map<number, { text: string; link: string; length: number }>();
                          
                          // Find all link positions
                          achievement.titleLinks.forEach((linkItem) => {
                            const index = text.indexOf(linkItem.text);
                            if (index !== -1) {
                              linkMap.set(index, {
                                text: linkItem.text,
                                link: linkItem.link,
                                length: linkItem.text.length,
                              });
                            }
                          });
                          
                          // Sort by position
                          const sortedPositions = Array.from(linkMap.keys()).sort((a, b) => a - b);
                          
                          let lastIndex = 0;
                          sortedPositions.forEach((pos, idx) => {
                            const linkData = linkMap.get(pos)!;
                            
                            // Add text before the link
                            if (pos > lastIndex) {
                              elements.push(text.substring(lastIndex, pos));
                            }
                            
                            // Add the link
                            elements.push(
                              <a
                                key={`link-${idx}`}
                                href={linkData.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="underline hover:opacity-80 transition-opacity"
                                style={{ color: 'inherit' }}
                              >
                                {linkData.text}
                              </a>
                            );
                            
                            lastIndex = pos + linkData.length;
                          });
                          
                          // Add remaining text
                          if (lastIndex < text.length) {
                            elements.push(text.substring(lastIndex));
                          }
                          
                          return elements.length > 0 ? elements : achievement.title;
                        })()
                      ) : (
                        achievement.title
                      )}
                    </ThemeHeading>
                    {achievement.awards && achievement.awards.length > 0 && (
                      <ul className="mt-1 space-y-0.5 sm:space-y-1">
                        {achievement.awards.map((award, awardIndex) => (
                          <li key={awardIndex} className="text-sm text-gray-400" style={{ fontFamily: THEME_FONT_PRIMARY }}>
                            <span style={{ color: THEME_PRIMARY }}>•</span>{' '}
                            {award.link ? (
                              <a
                                href={award.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="underline hover:opacity-80 transition-opacity"
                                style={{ color: 'inherit' }}
                              >
                                {award.text}
                              </a>
                            ) : (
                              award.text
                            )}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </ThemeCardBody>
          </ThemeCard>

          {/* EXPERIENCE */}
          <ThemeCard>
            <ThemeCardHeader style={{ backgroundColor: THEME_CATEGORY_EXPERIENCE_BG }}>
              <div className="flex items-center gap-2">
                <Briefcase className="h-4 w-4" style={{ color: THEME_CATEGORY_EXPERIENCE_TEXT }} />
                <ThemeTitle style={{ color: THEME_CATEGORY_EXPERIENCE_TEXT, fontSize: '0.875rem', fontWeight: '700' }}>EXPERIENCE</ThemeTitle>
              </div>
            </ThemeCardHeader>
            <ThemeCardBody style={{ backgroundColor: 'rgba(255, 152, 0, 0.05)' }}>
              <div className="space-y-3 sm:space-y-4">
                {personalInfo.experience.map((exp, expIndex) => (
                  <div key={expIndex}>
                    <ThemeHeading as="p" className="text-lg mb-1 flex items-center gap-1.5 sm:gap-2">
                      {exp.company.includes('CoSI') && (
                        <span className="inline-flex items-center flex-shrink-0">
                          <Image
                            src="/CoSI_Icon_Light.png"
                            alt="CoSI Icon"
                            width={20}
                            height={20}
                            className="object-contain"
                            unoptimized
                          />
                        </span>
                      )}
                      {exp.companyLink ? (
                        <a
                          href={exp.companyLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="underline hover:opacity-80 transition-opacity"
                          style={{ color: 'inherit' }}
                        >
                          {exp.company}
                        </a>
                      ) : (
                        exp.company
                      )}
                    </ThemeHeading>
                    <div className="flex items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2">
                      <Users className="h-3.5 w-3.5 sm:h-4 sm:w-4" style={{ color: THEME_PRIMARY }} />
                      <p className="text-sm" style={{ color: THEME_PRIMARY, fontFamily: THEME_FONT_PRIMARY }}>{exp.position}</p>
                    </div>
                    <div className="flex items-center gap-1.5 sm:gap-2 mb-2 sm:mb-3">
                      <Calendar className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-gray-500" />
                      <p className="text-sm text-gray-500" style={{ fontFamily: THEME_FONT_PRIMARY }}>{exp.period}</p>
                    </div>

                    <div className="space-y-2 sm:space-y-3 pl-3 sm:pl-4 border-l-2" style={{ borderColor: THEME_PRIMARY_BORDER }}>
                      {exp.projects.map((project, projectIndex) => (
                        <div key={projectIndex}>
                          <ThemeHeading as="p" className="text-sm mb-1">
                            {project.titleLinks && project.titleLinks.length > 0 ? (
                              (() => {
                                const text = project.title;
                                const elements: React.ReactNode[] = [];
                                const linkMap = new Map<number, { text: string; link: string; length: number }>();
                                
                                // Find all link positions
                                project.titleLinks.forEach((linkItem) => {
                                  const index = text.indexOf(linkItem.text);
                                  if (index !== -1) {
                                    linkMap.set(index, {
                                      text: linkItem.text,
                                      link: linkItem.link,
                                      length: linkItem.text.length,
                                    });
                                  }
                                });
                                
                                // Sort by position
                                const sortedPositions = Array.from(linkMap.keys()).sort((a, b) => a - b);
                                
                                let lastIndex = 0;
                                sortedPositions.forEach((pos, idx) => {
                                  const linkData = linkMap.get(pos)!;
                                  
                                  // Add text before the link
                                  if (pos > lastIndex) {
                                    elements.push(text.substring(lastIndex, pos));
                                  }
                                  
                                  // Add the link
                                  elements.push(
                                    <a
                                      key={`link-${idx}`}
                                      href={linkData.link}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="underline hover:opacity-80 transition-opacity"
                                      style={{ color: 'inherit' }}
                                    >
                                      {linkData.text}
                                    </a>
                                  );
                                  
                                  lastIndex = pos + linkData.length;
                                });
                                
                                // Add remaining text
                                if (lastIndex < text.length) {
                                  elements.push(text.substring(lastIndex));
                                }
                                
                                return elements.length > 0 ? elements : project.title;
                              })()
                            ) : (
                              project.title
                            )}
                          </ThemeHeading>
                          {project.responsibilities.length > 0 && (
                            <ul className="mt-1 space-y-0.5 sm:space-y-1">
                              {project.responsibilities.map((resp, respIndex) => {
                                const dentsuLink = 'https://www.facebook.com/dentsuCreativeTH';
                                const dentsuText = "Dentsu Creative Thailand";
                                const hasDentsu = resp.includes(dentsuText);
                                
                                return (
                                  <li key={respIndex} className="text-sm text-gray-400" style={{ fontFamily: THEME_FONT_PRIMARY }}>
                                    <span style={{ color: THEME_PRIMARY }}>•</span>{' '}
                                    {hasDentsu ? (
                                      <>
                                        {resp.split(dentsuText).map((part, partIndex, array) => (
                                          <span key={partIndex}>
                                            {part}
                                            {partIndex < array.length - 1 && (
                                              <a
                                                href={dentsuLink}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="underline hover:opacity-80 transition-opacity"
                                                style={{ color: 'inherit' }}
                                              >
                                                {dentsuText}
                                              </a>
                                            )}
                                          </span>
                                        ))}
                                      </>
                                    ) : (
                                      resp
                                    )}
                                  </li>
                                );
                              })}
                            </ul>
                          )}
                          {project.subProjects && (
                            <div className="mt-1 space-y-1.5 sm:space-y-2">
                              {project.subProjects.map((subProject, subIndex) => (
                                <div key={subIndex}>
                                  <ThemeHeading as="p" className="text-sm mb-1">
                                    {subProject.titleLinks && subProject.titleLinks.length > 0 ? (
                                      (() => {
                                        const text = subProject.title;
                                        const elements: React.ReactNode[] = [];
                                        const linkMap = new Map<number, { text: string; link: string; length: number }>();
                                        
                                        // Find all link positions
                                        subProject.titleLinks.forEach((linkItem) => {
                                          const index = text.indexOf(linkItem.text);
                                          if (index !== -1) {
                                            linkMap.set(index, {
                                              text: linkItem.text,
                                              link: linkItem.link,
                                              length: linkItem.text.length,
                                            });
                                          }
                                        });
                                        
                                        // Sort by position
                                        const sortedPositions = Array.from(linkMap.keys()).sort((a, b) => a - b);
                                        
                                        let lastIndex = 0;
                                        sortedPositions.forEach((pos, idx) => {
                                          const linkData = linkMap.get(pos)!;
                                          
                                          // Add text before the link
                                          if (pos > lastIndex) {
                                            elements.push(text.substring(lastIndex, pos));
                                          }
                                          
                                          // Add the link
                                          elements.push(
                                            <a
                                              key={`link-${idx}`}
                                              href={linkData.link}
                                              target="_blank"
                                              rel="noopener noreferrer"
                                              className="underline hover:opacity-80 transition-opacity"
                                              style={{ color: 'inherit' }}
                                            >
                                              {linkData.text}
                                            </a>
                                          );
                                          
                                          lastIndex = pos + linkData.length;
                                        });
                                        
                                        // Add remaining text
                                        if (lastIndex < text.length) {
                                          elements.push(text.substring(lastIndex));
                                        }
                                        
                                        return elements.length > 0 ? elements : subProject.title;
                                      })()
                                    ) : (
                                      subProject.title
                                    )}
                                  </ThemeHeading>
                                  <ul className="mt-1 space-y-0.5 sm:space-y-1">
                                    {subProject.responsibilities.map((resp, respIndex) => {
                                      const dentsuLink = 'https://www.facebook.com/dentsuCreativeTH';
                                      const dentsuText = "Dentsu Creative Thailand";
                                      const hasDentsu = resp.includes(dentsuText);
                                      
                                      return (
                                        <li key={respIndex} className="text-sm text-gray-400">
                                          <span style={{ color: THEME_PRIMARY }}>•</span>{' '}
                                          {hasDentsu ? (
                                            <>
                                              {resp.split(dentsuText).map((part, partIndex, array) => (
                                                <span key={partIndex}>
                                                  {part}
                                                  {partIndex < array.length - 1 && (
                                                    <a
                                                      href={dentsuLink}
                                                      target="_blank"
                                                      rel="noopener noreferrer"
                                                      className="underline hover:opacity-80 transition-opacity"
                                                      style={{ color: 'inherit' }}
                                                    >
                                                      {dentsuText}
                                                    </a>
                                                  )}
                                                </span>
                                              ))}
                                            </>
                                          ) : (
                                            resp
                                          )}
                                        </li>
                                      );
                                    })}
                                  </ul>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </ThemeCardBody>
          </ThemeCard>
        </div>
      </div>
    </div>
  );
}
