import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Video, BookOpen, Play } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export interface PurchasedCourse {
  id: number;
  title: string;
  description: string;
  price: number;
  duration: string;
  lessons: number;
  type: 'video' | 'ebook';
  image: string;
  level: string;
  progress?: number;
}

interface MyLibraryProps {
  courses: PurchasedCourse[];
  onOpenCourse: (courseId: number, type: 'video' | 'ebook') => void;
}

export function MyLibrary({ courses, onOpenCourse }: MyLibraryProps) {
  const videoCourses = courses.filter(c => c.type === 'video');
  const ebooks = courses.filter(c => c.type === 'ebook');

  if (courses.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <BookOpen className="w-12 h-12 text-gray-400" />
        </div>
        <h3 className="text-2xl font-bold mb-2">No Courses Yet</h3>
        <p className="text-gray-600 mb-6">
          Your purchased courses and e-books will appear here
        </p>
        <p className="text-sm text-gray-500">
          Browse the courses tab to find content that interests you!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {videoCourses.length > 0 && (
        <div>
          <h3 className="text-2xl mb-2">My Video Courses</h3>
          <p className="text-gray-600 mb-6">Continue learning with your purchased courses</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {videoCourses.map((course) => (
              <LibraryCourseCard 
                key={course.id} 
                course={course} 
                onOpen={() => onOpenCourse(course.id, 'video')} 
              />
            ))}
          </div>
        </div>
      )}

      {ebooks.length > 0 && (
        <div>
          <h3 className="text-2xl mb-2">My E-Books</h3>
          <p className="text-gray-600 mb-6">Read and reference your purchased e-books</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ebooks.map((course) => (
              <LibraryCourseCard 
                key={course.id} 
                course={course} 
                onOpen={() => onOpenCourse(course.id, 'ebook')} 
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function LibraryCourseCard({ course, onOpen }: { course: PurchasedCourse; onOpen: () => void }) {
  const progress = course.progress || 0;

  return (
    <Card className="overflow-hidden hover:shadow-xl transition-all group">
      <div className="relative h-48 overflow-hidden">
        <ImageWithFallback 
          src={course.image} 
          alt={course.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <Badge className="absolute top-3 right-3 bg-white text-gray-900">
          {course.level}
        </Badge>
        <div className="absolute bottom-3 left-3 right-3">
          {progress > 0 && (
            <div className="bg-white/90 backdrop-blur-sm rounded-lg p-2">
              <div className="flex justify-between text-xs mb-1">
                <span className="font-medium">Progress</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} className="h-1" />
            </div>
          )}
        </div>
      </div>
      <CardHeader>
        <div className="flex items-center gap-2 mb-2">
          {course.type === 'video' ? (
            <Video className="w-5 h-5 text-blue-600" />
          ) : (
            <BookOpen className="w-5 h-5 text-green-600" />
          )}
          <span className="text-sm text-gray-600 capitalize">{course.type} Course</span>
        </div>
        <CardTitle className="line-clamp-2">{course.title}</CardTitle>
        <CardDescription className="line-clamp-2">{course.description}</CardDescription>
      </CardHeader>
      <CardFooter>
        <Button 
          onClick={onOpen} 
          className="w-full group-hover:bg-primary/90 transition-colors"
        >
          {course.type === 'video' ? (
            <>
              <Play className="w-4 h-4 mr-2" />
              {progress > 0 ? 'Continue Learning' : 'Start Course'}
            </>
          ) : (
            <>
              <BookOpen className="w-4 h-4 mr-2" />
              {progress > 0 ? 'Continue Reading' : 'Start Reading'}
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
