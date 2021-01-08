using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace n_Puzzle_JSON
{
    class Program
    {
        static Stopwatch _sw = new Stopwatch();
        static void Main(string[] args)
        {
            StartLog();
            long num = 0;
            for (int i = 1; i < 1000000000; i++)
            {
                num += 1;
            }
            StopLog();
            Console.ReadLine();
        }

        //[Conditional("DEBUG")]
        //static void StartLog()
        //{
        //    _sw.Reset();
        //    _sw = Stopwatch.StartNew();
        //}
        //[Conditional("DEBUG")]
        //static void StopLog()
        //{
        //    _sw.Stop();
        //    TimeSpan el = _sw.Elapsed;
        //    Console.WriteLine("花費 {0} ", el);

        //    long ms = _sw.ElapsedMilliseconds;
        //    Console.WriteLine("花費 {0} 毫秒", ms);

        //    long tk = _sw.ElapsedTicks;
        //    Console.WriteLine("花費 {0} ticks", tk);
        //}
    }
}
