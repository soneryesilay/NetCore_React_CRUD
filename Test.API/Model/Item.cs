using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Test.API.Model
{
    public class Item
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;  
    }
}