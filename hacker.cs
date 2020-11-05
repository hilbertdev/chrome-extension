using System;
using System.Collections.Generic;
using System.IO;
class Solution {
    static void Main(String[] args) {
        /* Enter your code here. Read input from STDIN. Print output to STDOUT. Your class should be named Solution */
        int M = 1;
        int [] integers = {1,2,3,4,5,6,7,8,9,10};
        LinkedList<int> L = new LinkedList<int>(integers);
        Console.WriteLine(Convert.ToString(mth_to_last(L, M).Value));
    }
    static LinkedListNode <int> mth_to_last(LinkedList<int> L, int M)
    {
        var currentNode = L.Last;
        if(M > L.Count || M < 0)
        {
            return null;
        }
        if(M == L.Count)
        {
            return L.First;
        }
        else
        {
           for(int i = M; i > 1; i--)
            {
                currentNode = currentNode.Previous;
            }
              
            return currentNode;
        }
    }
}