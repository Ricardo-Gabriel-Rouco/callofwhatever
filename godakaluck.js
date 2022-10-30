// Esto va a ser lo que determine el camino a seguir de los jefes, algo asi como el diseñador del orden, igual lo hara de forma aleatoria.
class LinkedList {
    constructor() {
      this._length = 0;
      this.head = null;
    }
  }
  
  class Node {
    constructor(value) {
      this.value = value;
      this.next = null;
    }
  }
  
  LinkedList.prototype.add = function(value){
    let node = new Node(value)
    let actual = this.head
    if(!actual){
      this.head = node
      this._length++
      return node
    }
    while(actual.next){
      actual = actual.next
    }
    actual.next = node;
    this._length++
    return node
  }
  
  LinkedList.prototype.remove = function(){
    let actual = this.head
    // aca es por si no tiene nada
    if(!actual){
      return null;
    }
  // esto es para cuando solo tiene un valor
    if(!actual.next){
      this.head = null
      return actual.value
    }
  
    while(actual.next.next){
      actual = actual.next;
    }
    let eliminado = actual.next
    actual.next = null
    return eliminado.value
    
  }
  
  LinkedList.prototype.search = function(data){
    let actual = this.head
    if(!actual){ return null}
    while(actual){
      if(typeof data === "function"){
        if(data(actual.value)){ return actual.value}
      }
      if(actual.value === data){
        return actual.value
      }
      actual = actual.next
    }
    return null;
  
  }
  
//   Esto va a ser el apice evolutivo de la aleatoeridad, mi "IA" que determinara el nivel de los jefes vendra desde este arbol binario rancio.
function BinarySearchTree(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
  
  BinarySearchTree.prototype.size = function (){
    if(!this.value){return 0}
    if(this.right === null && this.left === null){return 1}
    if(this.right !== null && this.left === null){return 1 + this.right.size()}
    if(this.right === null && this.left !== null){return 1 + this.left.size()}
    if(this.right !== null && this.left !== null){return 1 + this.left.size() + this.right.size()}
  
  }
  
  BinarySearchTree.prototype.insert = function (value){
    if(value>this.value){
      if(this.right){
        this.right.insert(value)
      }
      else {
        this.right = new BinarySearchTree(value)
      }
    }
  
    if(value<this.value){
      if(this.left){
        this.left.insert(value)
      }
      else {
        this.left = new BinarySearchTree(value)
      }
    }
  }
  
  BinarySearchTree.prototype.contains = function (value){
    if(value === this.value){return true}
    
  }
  
  BinarySearchTree.prototype.depthFirstForEach = function (){
  
  }
  
  BinarySearchTree.prototype.breadthFirstForEach = function (){
  
  }
  