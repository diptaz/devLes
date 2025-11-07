import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Clock, BookOpen, Video, ShoppingCart, Lock } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

// Helper function to format price in Rupiah
const formatRupiah = (price: number): string => {
  return `Rp ${price.toLocaleString('id-ID')}`;
};

interface CourseCardProps {
  id: number;
  title: string;
  description: string;
  price: number;
  duration: string;
  lessons: number;
  type: 'video' | 'ebook';
  image: string;
  level: string;
  isPurchased?: boolean;
  isAuthenticated?: boolean;
  onAddToCart?: (course: { id: number; title: string; price: number; type: 'video' | 'ebook'; image: string }) => void;
  onView?: () => void;
}

export function CourseCard({ 
  id,
  title, 
  description, 
  price, 
  duration, 
  lessons, 
  type, 
  image,
  level,
  isPurchased = false,
  isAuthenticated = true,
  onAddToCart,
  onView
}: CourseCardProps) {
  return (
    <Card className={`overflow-hidden hover:shadow-xl transition-shadow ${isPurchased ? 'ring-2 ring-green-300' : ''}`}>
      <div className="relative h-48 overflow-hidden">
        <ImageWithFallback 
          src={image} 
          alt={title}
          className="w-full h-full object-cover"
        />
        <Badge className="absolute top-3 right-3">
          {level}
        </Badge>
      </div>
      <CardHeader>
        <div className="flex items-center gap-2 mb-2">
          {type === 'video' ? (
            <Video className="w-5 h-5 text-blue-600" />
          ) : (
            <BookOpen className="w-5 h-5 text-green-600" />
          )}
          <span className="text-sm text-gray-600 capitalize">{type} Course</span>
        </div>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-4 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{duration}</span>
          </div>
          <div className="flex items-center gap-1">
            <BookOpen className="w-4 h-4" />
            <span>{lessons} lessons</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        {!isPurchased ? (
          <>
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-green-600">FREE TRIAL</span>
              <span className="text-xs text-gray-500 line-through">{formatRupiah(price)}</span>
            </div>
            <Button 
              onClick={() => {
                console.log(`[CourseCard] Adding FREE TRIAL to cart: ${title} with price: 0`);
                onAddToCart?.({ id, title, price: 0, type, image });
              }}
              className="transition-all hover:scale-105 group bg-green-600 hover:bg-green-700"
            >
              {!isAuthenticated && <Lock className="w-4 h-4 mr-2" />}
              {!isAuthenticated ? (
                'Sign in to Get Free'
              ) : (
                <>
                  <ShoppingCart className="w-4 h-4 mr-2 group-hover:animate-[bounce_0.6s_ease-in-out]" />
                  Get Free Trial
                </>
              )}
            </Button>
          </>
        ) : (
          <>
            <Badge variant="secondary" className="bg-green-100 text-green-700 border-green-300">
              ✓ Purchased
            </Badge>
            <Button 
              onClick={onView}
              className="transition-all hover:scale-105"
            >
              {type === 'video' ? 'View Course' : 'Read Book'}
            </Button>
          </>
        )}
      </CardFooter>
    </Card>
  );
}
