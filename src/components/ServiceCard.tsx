import { Check, Clock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ServiceCardProps {
  title: string;
  description: string;
  price: string;
  duration?: string;
  benefits: string[];
  image: string;
  isPopular?: boolean;
  onBook: () => void;
}

export const ServiceCard = ({
  title,
  description,
  price,
  duration,
  benefits,
  image,
  isPopular = false,
  onBook,
}: ServiceCardProps) => {
  return (
    <div className={`relative group bg-gradient-card rounded-2xl overflow-hidden border transition-all duration-500 hover:shadow-elevated hover:-translate-y-2 ${isPopular ? 'border-primary shadow-glow' : 'border-border'}`}>
      {/* Popular Badge */}
      {isPopular && (
        <div className="absolute top-4 right-4 z-10 bg-gradient-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-semibold">
          Popular
        </div>
      )}

      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="font-display text-xl font-semibold text-foreground mb-2">{title}</h3>
        <p className="text-muted-foreground text-sm mb-4">{description}</p>

        {/* Price */}
        <div className="text-3xl font-bold text-primary mb-4">{price}</div>

        {/* Duration */}
        {duration && (
          <div className="flex items-center gap-4 mb-4">
            <span className="inline-flex items-center gap-2 bg-accent/50 text-accent-foreground px-3 py-1.5 rounded-full text-sm">
              <Clock size={14} />
              {duration}
            </span>
          </div>
        )}

        {/* Benefits */}
        <ul className="space-y-2 mb-6">
          {benefits.map((benefit, index) => (
            <li key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
              <Check size={16} className="text-primary flex-shrink-0" />
              {benefit}
            </li>
          ))}
        </ul>

        {/* Book Button */}
        <Button 
          variant="default" 
          className="w-full group/btn"
          onClick={onBook}
        >
          Book Now
          <ArrowRight size={16} className="transition-transform group-hover/btn:translate-x-1" />
        </Button>
      </div>
    </div>
  );
};
